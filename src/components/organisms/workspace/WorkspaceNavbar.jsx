import { LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { Button } from "@/components/ui/button";
import { useFetchWorkspaceById } from "@/hooks/apis/workspaces/useFetchWorkspaceById";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
  

export const WorkspaceNavbar = function() {

    const { workspaceId } = useParams();

    const {isFetching, workspace} = useFetchWorkspaceById(workspaceId);
    const {setCurrentWorkspace} = useCurrentWorkspace();

    useEffect(()=>{
        if(workspace) {
            setCurrentWorkspace(workspace);
        }
    },[workspace,setCurrentWorkspace]);

    if(isFetching) {
        return <LucideLoader2 className="animate-spin ml-2"/>;
    };

    return (
        <nav className="w-full h-16 bg-black text-white flex items-center justify-center shadow-md">
            <div className="max-w-7xl w-full px-4 flex items-center justify-between">

                {/* Left Section */}
                <div className="flex items-center space-x-6">
                    <span className="text-lg font-bold">Workspace</span>
                </div>
        
                {/* Center Section */}
                <div className="hidden md:flex items-center space-x-6">

                    <Button className="hover:text-yellow-300 transition">
                        <SearchIcon className="size-5"/>
                        Search {workspace?.name || "workspace"}
                    </Button>

                    <Button className="hover:text-yellow-300 transition">
                    Task
                    </Button>

                    <Button className="hover:text-yellow-300 transition">
                    Settings
                    </Button>
                    
                </div>
        
                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <button className="text-white px-3 py-1 rounded-lg hover:bg-red-400">
                    <UserButton/>
                    </button>
                </div>
        </div>
    </nav>
   );
};