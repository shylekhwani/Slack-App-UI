import { Button } from "@/components/ui/button";

export const SideBarButton = function({ Icon, label }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-2 px-4 py-2 group transition-all duration-200 hover:bg-gray-800 rounded-lg">
          {/* Button Wrapper */}
          <Button className="p-4 bg-blue-500 text-white rounded-full shadow-md group-hover:bg-blue-600 focus:ring-2 focus:ring-blue-400">
             <Icon className="w-6 h-6" />
          </Button>
          {/* Label */}
          <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white">
            {label}
          </span>
        </div>
     );
};
