import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontal } from "lucide-react";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { SideBarButton } from "@/components/molecules/SidebarButton/SideBarButton";

export const WorkspaceSidebar = function() {
    return (
        <aside className="w-20 md:w-24 bg-gray-900 text-white flex flex-col items-center space-y-6 py-6 shadow-lg">
        <div className="flex flex-col flex-grow items-center space-y-6">
          {/* Home Button */}
          <SideBarButton
            Icon={HomeIcon}
            label={'Home'}
          />

          {/* Direct Messages Button */}
          <SideBarButton
            Icon={MessageSquareIcon}
            label={'DMs'}
          />

          {/* Notifications Button */}
          <SideBarButton
            Icon={BellIcon}
            label={'Notifications'}
          />

          {/* More Options Button */}
          <SideBarButton
            Icon={MoreHorizontal}
            label={'More'}
          />
        </div>

        {/* User Profile Button */}
        <div className="mt-auto mb-4">
          <UserButton />
        </div>
      </aside>
    );
};
