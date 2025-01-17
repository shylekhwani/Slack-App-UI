import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";

export const UserItem = function({ memberId, label = 'Member', image }) {
  const { currentWorkspace} = useCurrentWorkspace();
  // console.log(currentWorkspace);

  return (
    <Button 
      size="sm" 
      className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
    >
      <Link 
        to={`/workspaces/${currentWorkspace?._id}/members/${memberId}`} 
        className="flex items-center space-x-3 text-gray-800 hover:text-gray-900"
      >
        {/* Avatar Section */}
        <Avatar className="w-8 h-8">
          <AvatarImage src={image} className="rounded-full" />
          <AvatarFallback className="bg-gray-300 text-gray-800 rounded-full">
            {label ? label.charAt(0).toUpperCase() : '?'}
          </AvatarFallback>
        </Avatar>

        {/* Label Section */}
        <span className="font-medium text-sm">
          {label}
        </span>
      </Link>
    </Button>
  );
};
