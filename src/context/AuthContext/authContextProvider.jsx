import { createContext, useEffect, useState } from "react";

// Create a context object to share authentication-related data across the app
const AuthContext = createContext();

export const AuthContextProvider = function ({ children }) {
    
     // Define a state object `auth`
    const [auth, setAuth] = useState({
        user: null,
        token: null
    });

    // Effect to restore auth state from localStorage when the app starts
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user && token) {
             setAuth({
             user: JSON.parse(user),
             token: token
             });
        };
    }, []); // Empty dependency array ensures this runs only once (on mount)

    // Return a context provider to share `auth` and `setAuth` with child components
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children} {/* Render child components passed into the provider */}
        </AuthContext.Provider>
    );
};

export default AuthContext;