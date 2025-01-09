import { useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { useToast } from "@/hooks/use-toast";


export const WorkspacePreferenceModal = function () {
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Retrieve modal state and workspace details from context
    const {
      initialValue,
      openPreferenceModal,
      setOpenPreferenceModal,
      workspace,
    } = useWorkspacePreferenceModal();

    // State to hold workspaceId
    const [workspaceId, setWorkspaceId] = useState(null);

    // Delete workspace mutation
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

    // Sync workspaceId with the current workspace
    useEffect(() => {
      setWorkspaceId(workspace?._id);
    }, [workspace]);

    // Close the modal
    function closeModal() {
      setOpenPreferenceModal(false);
    }

    // Handle workspace deletion
    async function handleDelete() {
      try {
        await deleteWorkspaceMutation();
        navigate("/home");
        queryClient.invalidateQueries("fetchWorkspaces");
        setOpenPreferenceModal(false);
        toast({
          title: "Workspace Deleted Successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error in deletion request", error);
        toast({
          title: "Error in Deleting Workspace",
          type: "error",
        });
      }
    }

    return (
      <Dialog open={openPreferenceModal} onOpenChange={closeModal}>
        <DialogContent className="bg-white rounded-lg shadow-md max-w-lg mx-auto p-6">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {initialValue || "Workspace Preferences"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            {/* Workspace Name Section */}
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-gray-700">Edit {initialValue} </p>
              <Button className="text-sm font-medium text-blue-500 bg-slate-200 ">
                <Edit2Icon/>
              </Button>
            </div>

            {/* Additional Content Placeholder */}
            <div className="flex items-center justify-between py-3 border-b">
              <p className="text-sm font-medium text-gray-700">Delete Workspace</p>
              <Button onClick={handleDelete} className="text-sm font-medium text-blue-500 bg-slate-200 ">
              <Trash2Icon/>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
};
