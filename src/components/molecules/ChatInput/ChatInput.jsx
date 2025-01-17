import { MessageEditor } from "@/components/atoms/Editor/Editor";

export const ChatInput = function() {
  return (
    <div className="">
      <MessageEditor
        placeholder="Type a Message"
        onSubmit={() => {}}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};
