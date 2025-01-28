import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModalContext } from "@/hooks/context/useCreateWorkspaceModalContext";

export const Home = function() {

   const { isFetching, workspaces } = useFetchWorkspace();
   const { setOpenWorkspaceModal } = useCreateWorkspaceModalContext();
   const navigate = useNavigate();

   useEffect(() => {
      if(isFetching) {
         return;
      };

      console.log('your workspace', workspaces);

      if(workspaces?.length === 0 || !workspaces) {
         console.log("no workspaces found");
         setOpenWorkspaceModal(true);
      } else {
         navigate(`/workspaces/${workspaces[0]._id}`);
      };

   }, [isFetching, workspaces, navigate, setOpenWorkspaceModal]);

   return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center text-white">
         <div className="w-full max-w-4xl p-8 md:p-16 rounded-xl bg-gray-800 bg-opacity-80 shadow-xl">
            <h1 className="text-4xl font-extrabold text-center text-white mb-6">
               Welcome to Your Dashboard
            </h1>
            <p className="text-center text-lg text-gray-300 mb-6">
               {isFetching ? 'Loading your workspace...' : 'Manage your workspace with ease!'}
            </p>
            
            {/* Avatar with Highlighting */}
            <div className="flex justify-center mb-6">
               <UserButton className="p-3 border-4 border-blue-500 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:border-blue-700" />
            </div>

            <div className="text-center">
               <button
                  onClick={() => setOpenWorkspaceModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Create New Workspace
               </button>
            </div>
         </div>
      </div>
   );
};
