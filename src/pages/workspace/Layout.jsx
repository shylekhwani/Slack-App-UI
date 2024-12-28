import { WorkspaceSidebar } from "@/components/organisms/workspace/WorkspaceSidebar";

export const WorkspaceLayout = function({ children }) {
      return (
         <div className="h-[100-vh]">
            <div className="flex h-[calc(100vh-0px)]">
                <WorkspaceSidebar/>
                {children}
            </div>
         </div>
      );
};