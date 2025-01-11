import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const SideBarItem = function ({ 
    label, 
    id, // channelId
    icon:Icon
 }) {
       const{ workspaceId } = useParams();

        return (
            <Button 
            size='sm' 
            className="flex items-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-blue-400 transition-all duration-150"
        >
            <Link 
                className="flex items-center gap-2 w-full text-left" 
                to={`/workspaces/${workspaceId}/channels/${id}`}
            >
                <Icon className='w-5 h-5 text-blue-500' />
                <span className="text-sm font-medium"> {label} </span>
            </Link>
        </Button>
   );
};