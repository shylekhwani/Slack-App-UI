import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanel/WorkspacePanelHeader";
import { useFetchWorkspaceById } from "@/hooks/apis/workspaces/useFetchWorkspaceById";

export const WorkspacePanel = function () {
  const { workspaceId } = useParams();

  const { isFetching, isSuccess, workspace } = useFetchWorkspaceById(workspaceId);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center h-full w-full flex-col space-y-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <p className="text-sm text-gray-600">Something Went Wrong</p>
      </div>
    );
  }

  return <WorkspacePanelHeader workspace={workspace} />;
};
