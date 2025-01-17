import { FaChevronDown } from "react-icons/fa"; 

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// The Channelheader component represents the header section of a channel with dialog functionality
export const ChannelHeader = function({ name }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 border-b border-gray-300">
      {/* Wrapper for the header with flexbox for alignment and styling */}
      <Dialog>
        {/* Dialog component to display additional information when triggered */}

        <DialogTrigger>
          {/* The button that triggers the dialog */}
          <Button className='flex items-center gap-1 px-2 py-1 bg-white hover:bg-gray-200 rounded-sm shadow text-sm'>
            {/* Display the channel name and a dropdown icon */}
            <span className="font-medium text-sm text-gray-800">{name}</span>
            <FaChevronDown className="text-xs text-gray-600" />
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-white p-4 rounded-md shadow-md">
          {/* Dialog content area styled with padding, rounded corners, and shadow */}
          <DialogHeader>
            {/* Dialog header containing the title */}
            <DialogTitle className="text-lg font-semibold text-gray-800">
              {name}
              {/* Channel name passed as a prop displayed as the title */}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3">
            {/* Content within the dialog box */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              {/* A section to display "Channel Name" with an edit option */}
              <p className="text-sm font-medium text-gray-600">Channel Name</p>
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Edit {/* Placeholder for edit functionality */}
              </p>
            </div>
            <p className="text-sm text-gray-700">{name}</p>
            {/* Displays the current channel name */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
