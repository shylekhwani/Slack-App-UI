import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = function () {

    const navigate = useNavigate();

    const [signInForm, setSignInForm] = useState({
        email: "",
        password: ""
    });

    return(
      <>
       <Card className="w-full max-w-md mx-auto p-4 border border-gray-200 shadow-sm rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-96">

         <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Sign In</CardTitle>
            <CardDescription className="text-sm text-gray-600">Sign In to your Account</CardDescription>
         </CardHeader>

         <CardContent>
            <form className="space-y-4">
                <Input
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, email: e.target.value })
                  }
                  value={signInForm.email}
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                />
                 <Button
                    disabled={false}
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

         </CardContent>
       </Card>
        </>
    );
};