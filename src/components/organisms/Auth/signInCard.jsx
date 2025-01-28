import { LucideLoader2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = function ({signInForm, setSignInForm, validationError, onSignInFormSubmit, isPending, isSuccess, error}) {

    const navigate = useNavigate();

    return(
      <>
       <Card className="w-full max-w-md mx-auto p-4 border border-gray-200 shadow-sm rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-96">

         <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Sign In</CardTitle>
            <CardDescription className="text-sm text-gray-600">Sign In to your Account</CardDescription>

            {validationError && (
            <div className="flex items-center gap-2 p-4 border border-red-500 bg-red-50 rounded-md">
              <TriangleAlert className="w-6 h-6 text-red-500" />
              <p className="text-sm text-red-600">{validationError.message}</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 border border-red-500 bg-red-50 rounded-md">
              <TriangleAlert className="w-6 h-6 text-red-500" />
              <p className="text-sm text-red-600">{validationError.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center gap-2 p-4 border border-green-500 bg-green-50 rounded-md">
              <p className="text-sm text-green-600 font-medium">
                Successfully Signed In. You will be redirected to the Home page.
              </p>
              <LucideLoader2 className="animate-spin w-5 h-5 text-green-500" />
            </div>
          )}
         </CardHeader>

         <CardContent>
            <form className="space-y-4" onSubmit={onSignInFormSubmit}>
                <Input
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, email: e.target.value })
                  }
                  value={signInForm.email}
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  disabled={isPending}
                />
                  <Input
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, password: e.target.value })
                  }
                  value={signInForm.password}
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  disabled={isPending}
                />
                 <Button
                    disabled={isPending}
                    size="lg"
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Continue
              </Button>
            </form>
             <Separator className='my-5'/>
            
                <div 
                 className="mt-4 text-center text-sm text-gray-600"
                 >
                    Dont have an account?  {' '}
                <span 
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={()=> navigate('/auth/signup')}
                >
                    Sign Up
                </span>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                      Forgot your password?{' '}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/auth/forgot-password')} // Update the path to the password reset page
                    >
                        Reset Password
                    </span>
               </div>

         </CardContent>
       </Card>
        </>
    );
};