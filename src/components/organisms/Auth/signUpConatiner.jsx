import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "@/hooks/apis/auth/useSignup";

import { SignUpCard } from "./signUpCard";

export const SignUpConatiner = function() {

    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({ /* we prefer clean code pratice instead of this =>{ const [email,setEmail] = useState('') }*/
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
  
    const  [validationError, setValidationError] = useState(null);

    const {isPending, isSuccess, error, signUpMutation} = useSignup();

    async function onSignupFormSubmit (event) {
        event.preventDefault();
        console.log('SignUpForm submitted', signupForm);

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            console.log('All fields are required');
            setValidationError({message: "All fields are required"});
            return;
        };

        if(signupForm.password !== signupForm.confirmPassword) {
            console.log('Password do not Match');
            setValidationError({message: "Password do not Match"});
            return;
        };

         // Clear validation error if checks pass
         setValidationError(null);

        await signUpMutation({
            email: signupForm.email,
            password:signupForm.password,
            username:signupForm.username
        });

    };

    useEffect(()=> {
      if(isSuccess) {
            setTimeout(()=>{
            navigate('/auth/signin');
            },3000);
         };
       },[isSuccess,navigate]);

    return (
        <SignUpCard 
        error={error}
        isPending={isPending}
        isSuccess={isSuccess}
        signupForm={signupForm} 
        setSignupForm={setSignupForm} 
        validationError={validationError}
        onSignupFormSubmit={onSignupFormSubmit} />
    );
};