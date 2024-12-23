import { useState } from "react";

import { SignInCard } from "./signInCard";

export const SignInContainer = function() {

 const [signInForm, setSignInForm] = useState({
        email: "",
        password: ""
    });

    return (
        <SignInCard signInForm={signInForm} setSignInForm={setSignInForm} />
    );
};