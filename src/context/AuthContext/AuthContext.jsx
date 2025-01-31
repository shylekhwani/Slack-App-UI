import { createContext, useEffect, useState } from "react";

// Create a context object to share authentication-related data across the app
const AuthContext = createContext();

export const AuthContextProvider = function ({ children }) {
    
     // Define a state object `auth`
    const [auth, setAuth] = useState({
        user: null,
        token: null,
        isLoading: true
    });

    // Effect to restore auth state from localStorage when the app starts
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user && token) {
             setAuth({
             user: JSON.parse(user),
             token: token,
             isLoading: false
           });
        } else {
            setAuth({
                user: null,
                token: null,
                isLoading: false
           });
        };
    }, []); // Empty dependency array ensures this runs only once (on mount)

    const logOut = async function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuth({
            user: null,
            token: null,
            isLoading: false
       });
    };

    // Return a context provider to share `auth` and `setAuth` with child components
    return (
        <AuthContext.Provider value={{ auth, setAuth, logOut }}>
            {children} {/* Render child components passed into the provider */}
        </AuthContext.Provider>
    );
};

export default AuthContext;