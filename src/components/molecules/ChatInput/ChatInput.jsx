import { useQueryClient } from "@tanstack/react-query";

import { getPreSignedUrl, uploadImageToAWS_PresignedUrl } from "@/api/AWS S3/AwsS3";
import { MessageEditor } from "@/components/atoms/Editor/Editor";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocketContext";
import { NEW_MESSAGE_EVENT } from "@/utils/eventConstants";

export const ChatInput = function () {

  const { socket, currentChannel } = useSocket();
  const { auth } = useAuthContext();
  const { currentWorkspace } = useCurrentWorkspace();
  const queryClient = useQueryClient();


  async function handelSubmit({ body, image }) {
    console.log('body & image', body, image);
    let fileUrl = null;

    if(image) {
      const preSignedUrl = await queryClient.fetchQuery({
        queryKey: ['getPreSignedUrl'],
        queryFn: () => getPreSignedUrl({ token: auth?.token }),
      });

      console.log('preSigned url', preSignedUrl);

      const responseAws = await uploadImageToAWS_PresignedUrl({
        url: preSignedUrl,
        file: image
      });
      console.log('File Upload Success', responseAws);
      fileUrl = preSignedUrl.split('?')[0];
    }

    socket?.emit(NEW_MESSAGE_EVENT, {
        channelId: currentChannel,
        body: body,
        image: fileUrl,
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
