import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignin } from "@/hooks/apis/auth/useSignin";

import { SignInCard } from "./signInCard";

export const SignInContainer = function() {
    const navigate = useNavigate();

    const [signInForm, setSignInForm] = useState({
            email: "",
            password: ""
        });

    const  [validationError, setValidationError] = useState(null);
    
    const {isPending, isSuccess, error, signInMutation} = useSignin();

    const onSignInFormSubmit = async function (event) {
        event.preventDefault();
        console.log('SignInForm submitted', signInForm);

        if(!signInForm.email || !signInForm.password) {
            console.log('All fields are required');
            setValidationError({message: "All fields are required"});
            return;
        };

        // Clear validation error if checks pass
        setValidationError(null);

        await signInMutation({
            email: signInForm.email,
            password:signInForm.password,
        });
     };
    
        useEffect(() => {
        if(isSuccess){
            navigate('/home');
        };
        },[isSuccess,navigate]);
    
        return (
            <SignInCard 
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            signInForm={signInForm}
            setSignInForm={setSignInForm}
            validationError={validationError}
            onSignInFormSubmit={onSignInFormSubmit} />
        );
};