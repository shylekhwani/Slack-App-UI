import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

import { useCreateChannelModal } from "@/hooks/context/useCreateChannel";


export const WorkspacePanelSection = ({ children, label}) => {

    const [open, setOpen] = useState(true);

     // imported Channel Modal Component
    const {setOpenCreateChannelModal} = useCreateChannelModal();
    
    return (

      <div className="flex flex-col mt-3 px-3">

            <div className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-md">

            <div className="flex items-center">
                <button
                onClick={() => setOpen(!open)} // Toggle the open and close
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                {open ? <FaCaretDown className="w-4 h-4" /> : <FaCaretRight className="w-4 h-4" />}
                </button>
                <span className="ml-2 text-sm font-medium text-gray-200">{label}</span>
            </div>

          
            <button
              onClick={() => setOpenCreateChannelModal(true) }
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
        
          
        </div>

        {open && <div className="mt-2 space-y-1">{children}</div>}
      </div>
    );
  };