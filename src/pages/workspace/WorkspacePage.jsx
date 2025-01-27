import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";

export const WorkspacePage = function () {
  const { currentWorkspace } = useCurrentWorkspace();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg bg-gray-800 max-w-3xl w-full border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to
        </h1>
        <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-12">
          {currentWorkspace?.name || "Your Workspace"}
        </p>
      </div>
    </div>
  );
};