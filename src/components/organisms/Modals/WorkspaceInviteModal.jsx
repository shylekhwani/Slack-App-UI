import { CopyIcon, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useResetWorkspaceJoinCode } from "@/hooks/apis/workspaces/useResetWorkspaceJoinCode";
import { useToast } from "@/hooks/use-toast";


export const WorkspaceInviteModal = function({ openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) {
    const {toast} = useToast();
    
    const {resetWorkspaceJoinCodeMutation} = useResetWorkspaceJoinCode(workspaceId);
    
    async function handelCopy() {
        // Copy the join code to clipboard
        const inviteCode = joinCode;
        await navigator.clipboard.writeText(inviteCode);
        setOpenInviteModal(false);
        alert("Invite code copied to clipboard!");
    };

    async function handelResetCode() {
     try {
        await resetWorkspaceJoinCodeMutation();
        toast({
         title: 'Join Code Reset Successfully',
         type: 'Success'
        });
     } catch (error) { 
        console.log(error);
        toast({
            title: 'Join Code Reset failed',
            type: 'error'
           });
       }
    };

    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
        <DialogContent className="max-w-md bg-gray-50 p-6 rounded-lg shadow-lg">
            <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
                Invite People to {workspaceName}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
                Use the code shown below to invite people.
            </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex flex-col items-center space-y-4">
            {/* Join Code Display */}
            <p className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-mono text-lg">
                {joinCode}
            </p>

            {/* Copy Button */}
            <Button 
                size="sm" 
                onClick={handelCopy} 
                className="flex items-center space-x-2 bg-slate-600 text-white hover:bg-slate-700"
            >
                <CopyIcon className="w-4 h-4" />
                <span>Copy Code</span>
            </Button>
            
            {/* Link To Redirect user To Join Page */}
            <a 
              href={`/workspaces/join/${workspaceId}`}
              target="blank"
              className=""
            >
                Redirect To Login Page
            </a>

            </div>

            <div className="mt-4 flex flex-col items-center space-y-4">
            {/* Reset Button */}
            <Button 
                onClick={handelResetCode} 
                className="flex items-center space-x-2 bg-green-600 text-white hover:bg-green-700"
            >
                <RefreshCcwIcon className="w-4 h-4" />
                <span>Reset Join Code</span>
            </Button>
            </div>

        </DialogContent>
        </Dialog>
    );
};
