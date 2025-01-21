import { MessageImageThumbnail } from "@/components/atoms/MessageImageThumbnail/MessageImageThumbnail";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Message = function ({ authorImage, authorName, createdAt, body, image }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex-shrink-0">
        <button className="focus:outline-none">
          <Avatar>
            <AvatarImage className="rounded-md" src={authorImage} />
            <AvatarFallback className="rounded-md text-sm text-white bg-sky-500">
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-1">
          <button className="font-medium text-gray-900 hover:underline focus:outline-none">
            {authorName}
          </button>
          <button className="text-sm text-gray-500 focus:outline-none">
            {createdAt}
          </button>
        </div>

        <div className="text-gray-700">
          <MessageRenderer value={body} />
          {/* Any Images If There Are */}
          {image && <MessageImageThumbnail url={image} />}
        </div>
      </div>
    </div>
  );
};
