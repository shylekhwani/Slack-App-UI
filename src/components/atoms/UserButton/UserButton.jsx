import { LogOut, Settings2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/hooks/context/useAuthContext";


export const UserButton = function() {
    const { auth } = useAuthContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='size-10 hover:opacity-65 transition'>
                    <AvatarImage src={ auth?.user?.avatar } />
                    <AvatarFallback> { auth?.user?.username[0].toUpperCase() } </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Settings2 />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>     
    );
};