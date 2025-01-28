import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/apis/auth/useForgotPassword"; // This should handle the password reset API

export const ForgotPassword = function () {
    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState(null);
    const { isPending, isSuccess, error, forgotPasswordMutation } = useForgotPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setValidationError({ message: "Email is required" });
            return;
        }

        setValidationError(null);

        await forgotPasswordMutation(email);
    };

    if (isSuccess) {
        setTimeout(() => {
            navigate('/auth/signin'); // Redirect back to sign-in after successful reset request
        }, 3000);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg shadow-xl bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full mb-6 px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        disabled={isPending}
                    />
                    {validationError && (
                        <p className="text-red-600 text-sm mb-6">{validationError.message}</p>
                    )}
                    {error && (
                        <p className="text-red-600 text-sm mb-6">{error.message}</p>
                    )}
                    <Button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <LucideLoader2 className="animate-spin w-6 h-6 text-white" />
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};
