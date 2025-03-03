import { useEffect, useState } from "react";
import { AuthContext } from "./ContextExport";
import Cookies from "js-cookie";

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const authCode = Cookies.get("authToken");
        setIsLoggedIn(!!authCode); // Converts authCode to a boolean
        setIsCheckingAuth(false); // Set to false after checking
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, isCheckingAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
