import { ChevronsDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";

export const WorkspacePanelHeader = function ({ workspace }) {
    // Get current user details from the auth context
    const { auth } = useAuthContext();

    // Determine if the logged-in user is an admin of the workspace
    const isLoggedInUserAdminOfWorkSpace = workspace?.members?.find(
      (member) => member.memberId === auth?.user?.id && member.role === "admin"
    );

    // Extract context methods to set modal preferences
    const { setOpenPreferenceModal, setInitialValue, setWorkspace } =
      useWorkspacePreferenceModal();

    // Update the workspace context whenever the workspace changes
    useEffect(() => {
      setWorkspace(workspace);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspace]);

    return (
      <div className="p-4 bg-gray-800 text-white shadow-md flex items-center justify-between">
        {/* Left Section */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400">
              <span className="truncate">{workspace.name}</span>
              <ChevronsDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-white text-gray-800 rounded-md shadow-lg w-64 p-2"
            side="bottom"
            align="start"
          >
            <DropdownMenuItem className="flex gap-3 items-center hover:bg-gray-100 rounded-md p-2">
              <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full text-sm font-semibold">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{workspace?.name}</p>
                <p className="text-xs text-gray-500">Active Workspace</p>
              </div>
            </DropdownMenuItem>

            {isLoggedInUserAdminOfWorkSpace && (
              <>
                <DropdownMenuItem className="cursor-pointer py-2" onClick={() => {
                  setInitialValue(workspace.name);
                  setOpenPreferenceModal(true);
                }}>
                  Preference
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2">
                  Invite People To {workspace.name}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            size="iconSm"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
          >
            <ListFilterIcon className="w-4 h-4" />
          </Button>
          <Button
            size="iconSm"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
          >
            <SquarePenIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
};
