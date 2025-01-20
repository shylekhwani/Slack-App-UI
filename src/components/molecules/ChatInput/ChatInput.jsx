import { MessageEditor } from "@/components/atoms/Editor/Editor";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocketContext";

export const ChatInput = function () {

  const { socket, currentChannel } = useSocket();
  const { auth } = useAuthContext();
  const { currentWorkspace } = useCurrentWorkspace();

  async function handelSubmit({ body }) {
    console.log('body', body);
    socket?.emit('NewMessage', {
        channelId: currentChannel,
        body: body,
        userId: auth?.user?.id,
        workspaceId: currentWorkspace?._id 
    }, (data) => {
      console.log('Message Sent', data);
    });
  };

  return (
    <div className="flex flex-col p-4 bg-white mb-4">
      <MessageEditor
        placeholder="Type a Message"
        onSubmit={handelSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};
