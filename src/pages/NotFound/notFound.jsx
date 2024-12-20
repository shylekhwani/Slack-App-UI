import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const NotFound = function () {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Error!</h1>
      <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
      <Button
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};
