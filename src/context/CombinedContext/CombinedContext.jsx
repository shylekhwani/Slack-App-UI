import { mergeAllContext } from "@/utils/MergeAllContext";

import { AuthContextProvider } from "../AuthContext/AuthContextProvider";
import { CreateChannelContextProvider } from "../ChannelContext/CreateChannelContext";
import { AddMemberContextProvider } from "../MemberContext/AddMemberContext";
import { ChannelMessagesProvider } from "../MessagesContext/ChannelMessages";
import { SocketContextProvider } from "../SocketContext/SocketContext";
import { CreateWorkspaceContextProvider } from "../WorkspaceContext/CreateWorkspaceContext";
import { WorkspaceContextProvider } from "../WorkspaceContext/WorkspaceContext";
import { WorkspacePreferenceModalProvider } from "../WorkspacePreferenceModalContext/WorkspacePreferenceModalContext";

export const CombinedContext_Provider = mergeAllContext(
    ChannelMessagesProvider,
    SocketContextProvider,
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalProvider,
    CreateChannelContextProvider,
    AddMemberContextProvider,
);


