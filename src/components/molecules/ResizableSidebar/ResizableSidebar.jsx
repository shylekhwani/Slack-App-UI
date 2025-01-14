import { WorkspacePanel } from "@/components/organisms/workspace/WorkspacePanel";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";

export const ResizableSidebar = function({ children }) {
    return (
        <ResizablePanelGroup 
            direction="horizontal"
            autoSaveId={'workspace-resize'}
        >
          <ResizablePanel
          defaultSize={20}
          minSize={11}
          className="bg-slate-900 text-white h-full "
          >
            <WorkspacePanel />

        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel minSize={20}>
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    );
};