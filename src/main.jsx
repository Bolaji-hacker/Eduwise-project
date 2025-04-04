import { createRoot } from "react-dom/client";

import "./index.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { adminRoutes } from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext";
import GlobalContextProvider from "./context/GlobalContext";
import { clientRoutes } from "./routes/ClientRoutes";

const router = createBrowserRouter([...adminRoutes, ...clientRoutes]);

createRoot(document.getElementById("root")).render(
    <GlobalContextProvider>
        <AuthContextProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthContextProvider>
    </GlobalContextProvider>
);
