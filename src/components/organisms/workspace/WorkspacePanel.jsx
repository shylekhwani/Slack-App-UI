import { AlertTriangle, HashIcon, Loader2, MessageSquareCodeIcon } from "lucide-react";
import { useParams } from "react-router-dom";

import { SideBarItem } from "@/components/atoms/SideBarItem/SideBarItem";
import { UserItem } from "@/components/atoms/UserItem/UserItem";
import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanel/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/Workspace/WorkspacePanelSection/WorkspacePanelSection";
import { useFetchWorkspaceById } from "@/hooks/apis/workspaces/useFetchWorkspaceById";

export const WorkspacePanel = function () {
  const { workspaceId } = useParams();
  const { isFetching, isSuccess, workspace } = useFetchWorkspaceById(workspaceId);

  // Show loading state
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  // Show error state
  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center h-full w-full flex-col space-y-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <p className="text-sm text-gray-600">Something Went Wrong</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 h-full overflow-y-auto"> {/* Added h-full and overflow-y-auto */}
      <WorkspacePanelHeader workspace={workspace} />

      <div className="mt-4 p-2">
        <SideBarItem 
          label={'Threads'}
          icon={MessageSquareCodeIcon}
          id={'threads'}
        />
      </div>

      <WorkspacePanelSection label={'Channels'} className="p-2">
        {workspace?.channels?.map((channel) => (
          <SideBarItem 
            key={channel._id} 
            label={channel.name}
            channelId={channel._id}
            icon={HashIcon}             
          />
        ))}
      </WorkspacePanelSection>

      <WorkspacePanelSection label={'Members'} className="p-2">
        {workspace?.members?.map((member) => (
          <UserItem 
            key={member.memberId._id}
            label={member.memberId.username}
            memberId={member.memberId._id}
            image={member.memberId.avatar}
          />
        ))}
      </WorkspacePanelSection>
    </div>
  );
};
