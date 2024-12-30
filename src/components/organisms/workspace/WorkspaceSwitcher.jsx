import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useFetchWorkspaceById } from "@/hooks/apis/workspaces/useFetchWorkspaceById";

export const WorkspaceSwitcher = function() {

    const navigate = useNavigate();
    
    const { workspaceId } = useParams();

    const { isFetching, isSuccess:isfetched, workspace } = useFetchWorkspaceById(workspaceId);
    const {isFetching:areWorkspacesFetching, isSuccess, workspaces} = useFetchWorkspace();

    return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:bg-gray-500 transition-all">
              {isFetching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                workspace?.name?.charAt(0).toUpperCase() || "W"
              )}
            </button>
          </DropdownMenuTrigger>
      
          <DropdownMenuContent className="bg-white rounded-md shadow-lg p-2 w-56">
            {/* Active Workspace */}
            {isfetched && (
              <DropdownMenuItem className="flex items-center justify-between">
                <p>{workspace.name}</p>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
              </DropdownMenuItem>
            )}
      
            {/* Other Workspaces */}
            {areWorkspacesFetching ? (
              <div className="flex justify-center items-center p-2">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : (
              isSuccess &&
              workspaces
                ?.filter((workspace) => workspace._id !== workspaceId) // Exclude active workspace
                .map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => navigate(`/workspaces/${workspace._id}`)}
                  >
                    <span>{workspace.name}</span>
                  </DropdownMenuItem>
                ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ); 
};