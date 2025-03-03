import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const GlobalContext = createContext();
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
