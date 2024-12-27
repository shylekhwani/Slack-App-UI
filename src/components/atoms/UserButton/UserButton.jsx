import { LogOut, PencilIcon, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useCreateWorkspaceModalContext } from "@/hooks/context/useCreateWorkspaceModalContext";
import { useToast } from "@/hooks/use-toast";

export const UserButton = function() {
    const { auth, logOut } = useAuthContext();
    const { setOpenWorkspaceModal } = useCreateWorkspaceModalContext();

    const { toast } = useToast();
    const navigate = useNavigate();

    const handelLogOut = async function() {
       await logOut();

       toast ({
        title: "Successfully Signed out",
        type: "Success"
      });

      navigate('/auth/signin');
    };

    const handelCreateWorkspaceModal = function() {
        setOpenWorkspaceModal(true);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='size-10 hover:opacity-65 transition'>
                    <AvatarImage src={ auth?.user?.avatar } />
                    <AvatarFallback> { auth?.user?.username[0].toUpperCase() } </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handelCreateWorkspaceModal}>
                 <PencilIcon/>
                 Create Workspace
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings2 />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handelLogOut}>
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>     
    );
};