import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { adminRoutes } from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext";
import GlobalContextProvider from "./context/GlobalContext";

const router = createBrowserRouter([...adminRoutes]);

createRoot(document.getElementById("root")).render(
    <GlobalContextProvider>
        <AuthContextProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthContextProvider>
    </GlobalContextProvider>
);
