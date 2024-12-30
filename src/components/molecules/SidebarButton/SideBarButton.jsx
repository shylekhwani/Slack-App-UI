export const SideBarButton = function ({ Icon, label }) {
  return (
    <div className="flex flex-col items-center space-y-2 group">
      {/* Icon Button */}
      <button className="p-3 bg-slate-900 rounded-full shadow-md group-hover:bg-blue-600 transition duration-200">
        <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
      </button>
      {/* Label */}
      <span className="text-sm text-gray-400 group-hover:text-white">
        {label}
      </span>
    </div>
  );
};
