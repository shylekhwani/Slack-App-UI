import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModalContext } from "@/hooks/context/useCreateWorkspaceModalContext";

export const CreateWorkspaceModal = function() {

    const { openWorkspaceModal, setOpenWorkspaceModal } = useCreateWorkspaceModalContext();

    const { isPending, createWorkspaceMutation } = useCreateWorkspace();
    
    const [workspaceName, setWorkspaceName] = useState();
    const [workspaceDescription, setWorkspaceDescription] = useState();

    const navigate = useNavigate();

    function closeModal() {
      setOpenWorkspaceModal(false);
    };

    async function handelFormSubmit(e) {
        e.preventDefault();
        try {
            const data = await createWorkspaceMutation({
                name: workspaceName,
                description: workspaceDescription
            });
            console.log('created workspace data', data);
            navigate(`/workspaces/${data.id}`);
        } catch (error) {
            console.log('Not Able To Create Workspace', error);
        } finally {
            setWorkspaceDescription(''),
            setWorkspaceName('');
            setOpenWorkspaceModal(false);
        }
    };

    return (
       <Dialog 
        open={openWorkspaceModal}
        onOpenChange={closeModal}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Workspace</DialogTitle>
                </DialogHeader>

                <form className=" space-y-4" onSubmit={handelFormSubmit}>
                    <Input
                       disabled={isPending}
                       required
                       minLength={3}
                       placeholder='Put Workspace Name'
                       value={workspaceName}
                       onChange={(e) => setWorkspaceName(e.target.value)}
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
                        disabled={isPending}
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