import { AlertTriangle, HashIcon, Loader2, MessageSquareCodeIcon } from "lucide-react";
import { useParams } from "react-router-dom";

import { SideBarItem } from "@/components/atoms/SideBarItem/SideBarItem";
import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanel/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/Workspace/WorkspacePanelSection/WorkspacePanelSection";
import { useFetchWorkspaceById } from "@/hooks/apis/workspaces/useFetchWorkspaceById";

export const WorkspacePanel = function () {
  // Extract workspaceId from the URL parameters
  const { workspaceId } = useParams();

  
  // Fetch workspace details using the custom hook
  const { isFetching, isSuccess, workspace } = useFetchWorkspaceById(workspaceId);

  // Show loading state while fetching
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  // Show error state if fetch fails
  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center h-full w-full flex-col space-y-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <p className="text-sm text-gray-600">Something Went Wrong</p>
      </div>
    );
  }

  // Pass the fetched workspace details to the WorkspacePanelHeader
  return (
      <div className="flex flex-col bg-gray-100 min-h-full">
      <WorkspacePanelHeader workspace={workspace} />

      <div className="mt-4 p-2">
        <SideBarItem 
          label={'Threads'}
          icon={MessageSquareCodeIcon}
          id={'threads'}
        />
      </div>

      <WorkspacePanelSection label={'Channels'} className="p-2" >

          {workspace?.channels?.map((channel)=> {
            return <SideBarItem 
                key={channel._id} 
                label={channel.name}
                id={channel._id}
                icon={HashIcon}             
             />;
            }
          )}

      </WorkspacePanelSection>
    </div>
  );
};
