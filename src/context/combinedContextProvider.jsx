import { CombineContext } from "@/utils/CombineContext";

import { AuthContextProvider } from "./AuthContext/AuthContextProvider";
import { CreateChannelContextProvider } from "./ChannelContext/CreateChannelContext";
import { AddMemberContextProvider } from "./MemberContext/AddMemberContext";
import { ChannelMessagesProvider } from "./MessagesContext/ChannelMessages";
import { SocketContextProvider } from "./SocketContext/SocketContext";
import { CreateWorkspaceContextProvider } from "./WorkspaceContext/CreateWorkspaceContext";
import { WorkspaceContextProvider } from "./WorkspaceContext/WorkspaceContext";
import { WorkspacePreferenceModalProvider } from "./WorkspacePreferenceModalContext/WorkspacePreferenceModalContext";

const CombinedContextProvider = CombineContext(
    ChannelMessagesProvider,
    SocketContextProvider,
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalProvider,
    CreateChannelContextProvider,
    AddMemberContextProvider,
);

export default CombinedContextProvider;  // Default export
