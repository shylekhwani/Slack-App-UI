import { LucideLoader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "@/hooks/context/useAuthContext";

export const ProtectedRoute = function({ children }) {
    const {auth} = useAuthContext();

    if(auth.isLoading) {
        return <div><LucideLoader2 className="animate-spin w-5 h-5 text-green-500"/>Loading...</div>;
    };

    if (!auth.user || !auth.token) {
        return <Navigate to='/auth/signin' replace />;
    };

    return children;
};