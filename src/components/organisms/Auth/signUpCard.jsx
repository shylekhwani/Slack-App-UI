import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";


export const SignUpCard = function () {
 
    const [signupForm, setSignupForm] = useState({ /* we prefer clean code pratice instead of this =>{ const [email,setEmail] = useState('') }*/
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
      
    return (
        <Card className="w-full max-w-md mx-auto p-4 border border-gray-200 shadow-sm rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-auto">

        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Sign Up</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Sign up to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
           <Input
              placeholder="Username"
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
              value={signupForm.username}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <Input
              placeholder="Email"
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              value={signupForm.email}
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <Input
              placeholder="Password"
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              value={signupForm.password}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <Input
              placeholder="Confirm Password"
              required
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  confirmPassword: e.target.value,
                })
              }
              value={signupForm.confirmPassword}
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

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign in</a>
                </div>

        </CardContent>
      </Card>
    );
};