import { MessageEditor } from "@/components/atoms/Editor/Editor";

export const ChatInput = function () {
  return (
    <div className="flex flex-col p-4 bg-white mb-4">
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
