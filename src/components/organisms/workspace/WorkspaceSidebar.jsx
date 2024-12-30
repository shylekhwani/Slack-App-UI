import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontal } from "lucide-react";

import { SideBarButton } from "@/components/molecules/SidebarButton/SideBarButton";

import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export const WorkspaceSidebar = function () {
  return (
    <aside className="w-20 md:w-24 bg-black text-white flex flex-col items-center py-6 shadow-lg">

      {/* Switcher Section */}
      <div className="mb-10">
        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
        <WorkspaceSwitcher />
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col flex-grow items-center space-y-8">
        <SideBarButton Icon={HomeIcon} label="Home" />
        <SideBarButton Icon={MessageSquareIcon} label="DMs" />
        <SideBarButton Icon={BellIcon} label="Notifications" />
        <SideBarButton Icon={MoreHorizontal} label="More" />
      </nav>
    </aside>
  );
};
