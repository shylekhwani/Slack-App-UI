import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

import { useAddMemberModal } from '@/hooks/context/useAddMemberModal';


export const WorkspacePanelSectionMember = ({ children, label}) => {

    const [open, setOpen] = useState(true);

     // imported Channel Modal Component
    const { setOpenAddMemberModal } = useAddMemberModal();
    
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
              onClick={() =>setOpenAddMemberModal(true) }
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
        
          
        </div>

        {open && <div className="mt-2 space-y-1">{children}</div>}
      </div>
    );
  };