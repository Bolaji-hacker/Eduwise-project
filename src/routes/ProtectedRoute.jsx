import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/ContextExport";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isCheckingAuth } = useAuthContext();

    // if (isCheckingAuth) {
    //     // You can render a more informative loading indicator
    //     return (
    //         <div className="fixed z-50 top-0 left-0 bottom-0 right-0 bg">
    //             Loading...
    //         </div>
    //     );
    // }

    if (isLoggedIn === false) {
        // Redirect to login page if not logged in
        return <Navigate to="/login" />;
    }

    // If logged in, render children
    return children;
};

export default ProtectedRoute;
