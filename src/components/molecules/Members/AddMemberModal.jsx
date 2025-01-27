import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddMember } from "@/hooks/apis/workspaces/useAddMemberToWorkspace";
import { useAddMemberModal } from "@/hooks/context/useAddMemberModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";

export const AddMemberModal = function () {
  // Toast notifications for success and error messages
  const { toast } = useToast();
  
  // React Query's QueryClient to manage cached data
  const queryClient = useQueryClient();

  // Local state to store the Id of the new Member
  const [memberId, setMemberId] = useState('');

  // Modal control: open and close state
  const {openAddMemberModal, setOpenAddMemberModal} = useAddMemberModal();

  // Current workspace details from context
  const { currentWorkspace } = useCurrentWorkspace();
  const workspaceId = currentWorkspace?._id;

  // Hook for adding a Member to the workspace
  const {isPending, addMemberMutation } = useAddMember(workspaceId);

  // Function to close the modal
  function handelClose() {
   setOpenAddMemberModal(false);
  };

  async function handelFormSubmit(e) {
    e.preventDefault(); // Prevent page reload

    // Validate input
    if (!memberId.trim()) {
        toast({ title: "Member ID cannot be empty", type: "error" });
        return;
    }

    try {
        // Trigger the mutation to add a new member
        console.log('Submitting Member ID:', memberId);
        await addMemberMutation(memberId);

        // Close the modal upon success
        setOpenAddMemberModal(false);

        // Invalidate the query to refresh the workspace
        queryClient.invalidateQueries(['fetchWorkspaceById', workspaceId], {
            refetchActive: true,
            refetchInactive: true,
        });

        toast({ title: "Member Added Successfully", type: "success" });
    } catch (error) {
        console.error("Error Adding Member:", error);
        toast({ title: error?.message || "Failed to Add Member", type: "error" });
    }
}


  return (
    <Dialog open={openAddMemberModal} onOpenChange={handelClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add a Member
          </DialogTitle>
        </DialogHeader>

        {/* Form for creating a channel */}
        <form onSubmit={handelFormSubmit} className="mt-6 space-y-4">
          {/* Input Field for Channel Name */}
          <Input
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            minLength={3} 
            placeholder="Member Id"
            required 
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              disabled={isPending} // Disable button when the mutation is pending
            >
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
