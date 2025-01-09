import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModalContext } from "@/hooks/context/useCreateWorkspaceModalContext";

export const Home = function() {

   const {isFetching, workspaces} = useFetchWorkspace();

   const { setOpenWorkspaceModal } = useCreateWorkspaceModalContext();

   const navigate = useNavigate();

   useEffect(() => {

      if(isFetching) {
         return;
      };

      console.log('your workspace', workspaces);

      if(workspaces.length === 0 || !workspaces) {
         console.log("no workspaces found");
         setOpenWorkspaceModal(true);
      } else {
          navigate(`/workspaces/${workspaces[0]._id}`);
      };

   }, [isFetching, workspaces, navigate, setOpenWorkspaceModal]);

   return (
      <>
      <h1>Home</h1>
      <UserButton />
      </>
   );
};