import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModalContext } from "@/hooks/context/useCreateWorkspaceModalContext";

export const CreateWorkspaceModal = function() {
    
    // Access modal state and setter from context
    const { openWorkspaceModal, setOpenWorkspaceModal } = useCreateWorkspaceModalContext();

    // Access workspace creation mutation and its loading state
    const { isPending, createWorkspaceMutation } = useCreateWorkspace();
    
    // Local state for form inputs
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');

    // Navigation hook
    const navigate = useNavigate();

    // Function to close the modal
    function closeModal() {
        setOpenWorkspaceModal(false);
    };

    // Form submission handler
    async function handelFormSubmit(e) {
        e.preventDefault(); // Prevent page reload
        try {
            // Call mutation to create a new workspace
            const data = await createWorkspaceMutation({
                name: workspaceName,
                description: workspaceDescription
            });
            console.log('Created workspace data', data);
            // Navigate to the newly created workspace
            navigate(`/workspaces/${data.id}`);
        } catch (error) {
            console.log('Not Able To Create Workspace', error);
        } finally {
            // Reset form and close modal after submission
            setWorkspaceDescription('');
            setWorkspaceName('');
            setOpenWorkspaceModal(false);
        }
    };

    return (
       <Dialog 
        open={openWorkspaceModal} // Controls if modal is visible
        onOpenChange={closeModal} // Closes modal on user interaction
       >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Workspace</DialogTitle>
                </DialogHeader>

                {/* Form for workspace creation */}
                <form className="space-y-4" onSubmit={handelFormSubmit}>
                    <Input
                       disabled={isPending} // Disable while submission is pending
                       required
                       minLength={3} // Enforce minimum character length
                       placeholder='Put Workspace Name'
                       value={workspaceName} // Bind input value to state
                       onChange={(e) => setWorkspaceName(e.target.value)} // Update state on input change
                    />
                    <Input
                       disabled={isPending}
                       required
                       minLength={5}
                       placeholder='Put Workspace Description'
                       value={workspaceDescription}
                       onChange={(e) => setWorkspaceDescription(e.target.value)}
                    />
                     <Button
                        disabled={isPending} // Disable button while submission is pending
                        size="lg"
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                     >
                        Create Workspace
                    </Button>
                </form>
            </DialogContent>
       </Dialog>
    );
};