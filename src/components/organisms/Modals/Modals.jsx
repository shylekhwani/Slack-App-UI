import { CreateChannelModal } from "@/components/molecules/Channels/CreateChannelModal/CreateChannelModal";
import { AddMemberModal } from "@/components/molecules/Members/AddMemberModal";
import { CreateWorkspaceModal } from "@/components/molecules/Workspace/WorkspaceModal/CreateWorkspaceModal";
import { WorkspacePreferenceModal } from "@/components/molecules/Workspace/WorkspacePreferenceModal/WorkspacePreferenceModal";


export const Modals = function() {
    return (
        <>
        <CreateWorkspaceModal />
        <WorkspacePreferenceModal />
        <CreateChannelModal />
        <AddMemberModal />
        </>
    );
};