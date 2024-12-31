import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";


export const WorkspacePreferenceModal = function () {
  const { initialValue, openPreferenceModal, setOpenPreferenceModal } = useWorkspacePreferenceModal();

  function closeModal() {
    setOpenPreferenceModal(false);
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
          <div className="flex items-center justify-between py-3 border-b">
            <p className="text-sm font-medium text-gray-700">Workspace Name</p>
            <button className="text-sm font-medium text-blue-500 ">
              Edit
            </button>
          </div>

          {/* Additional Content Placeholder */}
          <div className="flex items-center justify-between py-3 border-b">
            <p className="text-sm font-medium text-gray-700">Delete Workspace</p>
            <button className="text-sm font-medium text-blue-500 ">
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
