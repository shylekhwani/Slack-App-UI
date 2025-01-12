import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannel } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannel";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";

export const CreateChannelModal = function () {
  // Toast notifications for success and error messages
  const { toast } = useToast();
  
  // React Query's QueryClient to manage cached data
  const queryClient = useQueryClient();

  // Local state to store the name of the new channel
  const [channelName, setChannelName] = useState("");

  // Modal control: open and close state
  const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

  // Current workspace details from context
  const { currentWorkspace } = useCurrentWorkspace();
  const workspaceId = currentWorkspace?._id;

  // Hook for adding a channel to the workspace
  const { isPending, addChannelMutation } = useAddChannel(workspaceId);

  // Function to close the modal
  function handelClose() {
    setOpenCreateChannelModal(false);
  };

  // Form submission handler
  async function handelFormSubmit(e) {
    try {
      e.preventDefault(); // Prevent page reload
      
      // Trigger the mutation to add a new channel
      await addChannelMutation(channelName);

      // Close the modal upon successful channel creation
      setOpenCreateChannelModal(false);

      // Invalidate the query to refetch the workspace data and include the new channel
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);

      toast({ title: "Channel Added Successfully", type: "success" });
    } catch (error) {
      // Log and notify about the error
      console.log("Error in Creating Channel", error);
      toast({ title: "Failed To Add Channel in Workspace", type: "error" });
      throw error;
    }
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handelClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create a Channel
          </DialogTitle>
        </DialogHeader>

        {/* Form for creating a channel */}
        <form onSubmit={handelFormSubmit} className="mt-6 space-y-4">
          {/* Input Field for Channel Name */}
          <Input
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            minLength={3} 
            placeholder="Channel Name"
            required 
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              disabled={isPending} // Disable button when the mutation is pending
            >
              Create Channel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
