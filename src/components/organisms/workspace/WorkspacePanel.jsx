import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";

export const WorkspacePanel = function({ children }) {
    return (
        <ResizablePanelGroup 
            direction="horizontal"
            autoSaveId={'workspace-resize'}
        >
          <ResizablePanel
          defaultSize={20}
          minSize={11}
          className="bg-slate-900 text-white "
          >
            Reaizable Panel
        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel minSize={20}>
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    );
};