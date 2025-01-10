import { useQueryClient } from "@tanstack/react-query";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { useToast } from "@/hooks/use-toast";
import { useConfirm } from "@/hooks/useConfirm";

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

  // State variables for workspace details and modal behavior
  const [workspaceId, setWorkspaceId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(initialValue);

  // Delete workspace mutation
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

  // Update workspace mutation
  const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

  // Sync workspace details with the modal state when `workspace` changes
  useEffect(() => {
    setWorkspaceId(workspace?._id);
    setRenameValue(workspace?.name);
  }, [workspace]);

  // Close the main modal
  const closeModal = () => setOpenPreferenceModal(false);

  const { ConfirmDialog, confirmation } = useConfirm({title:'Do you want to delete workspace?', messsage: 'This Action Cannot Be Undone'});

  // Handle workspace deletion
  const handleDelete = async () => {
    try {
     // Await user confirmation
    const ok = await confirmation();

    // If user cancels, stop execution
    if (!ok) {
      console.log("Deletion canceled by the user.");
      return;
    }
      await deleteWorkspaceMutation();
      queryClient.invalidateQueries("fetchWorkspaces");
      navigate("/home");
      setOpenPreferenceModal(false);
      toast({ title: "Workspace Deleted Successfully", type: "success" });
    } catch (error) {
      console.error("Error in deletion request", error);
      toast({ title: "Error in Deleting Workspace", type: "error" });
    }
  };

  // Handle workspace rename form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await updateWorkspaceMutation(renameValue);
      // Invalidate the query to refetch the latest data
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspace._id}`);
      setOpenPreferenceModal(false);
      toast({
        title: "Workspace Updated Successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error in updating workspace", error);
      toast({
        title: "Error in Updating Workspace",
        type: "error",
      });
    }
  }; 
  
  return (
    <>
     <ConfirmDialog/>
      <Dialog open={openPreferenceModal} onOpenChange={closeModal}>
        {/* Main Modal Content */}
        <DialogContent className="bg-white rounded-lg shadow-md max-w-lg mx-auto p-6">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {initialValue || "Workspace Preferences"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            {/* Workspace Rename Section */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between py-3">
                  <p className="text-sm font-medium text-gray-700">
                    Edit {initialValue}
                  </p>
                  <Button className="text-sm font-medium text-blue-500 bg-slate-200">
                    <Edit2Icon />
                  </Button>
                </div>
              </DialogTrigger>

              {/* Rename Workspace Modal */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> Rename {initialValue}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={50}
                    placeholder="Workspace Name"
                    disabled={isPending}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={isPending} className="mt-6">
                      Save
                    </Button>
                    <DialogClose>
                      <Button type="button" disabled={isPending} className="mt-6">
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Workspace Deletion Section */}
            <div className="flex items-center justify-between py-3 border-b">
              <p className="text-sm font-medium text-gray-700">Delete Workspace</p>
              <Button
                onClick={handleDelete}
                className="text-sm font-medium text-blue-500 bg-slate-200"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
