import { useEffect } from "react";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";

export const Home = function() {
   const {isFetching, workspaces} = useFetchWorkspace();

   // useEffect(() => {

   //    if(isFetching) {
   //       return;
   //    };

   //    console.log('your workspace', workspaces);

   //    if(workspaces.length === 0 || !workspaces) {
   //       console.log("no workspaces found");
   //    };

   // }, [isFetching, workspaces]);

   return (
      <>
      <h1>Home</h1>
      <UserButton />
      </>
   );
};