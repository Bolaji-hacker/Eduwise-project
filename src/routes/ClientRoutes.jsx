import { Navigate } from "react-router-dom";
import Sidebar from "../components/common/SIdeBar";
import AuthLayout from "../Layout/AuthLayout";
import ForgetPassword from "../pages/client/auth/ForgetPassword";
import Login from "../pages/client/auth/Login";
import Register from "../pages/client/auth/Register";
import Dashboard from "../pages/client/Dashboard";
import MyCourse from "../pages/client/MyCourse";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/client/Profile";
import Jobs from "../pages/client/Jobs";
import MyCourseContent from "../pages/client/MyCourseContent";
import AllCourse from "../pages/client/AllCourse";
import Admin from "../pages/client/Admin";
import ResetPassword from "../pages/client/auth/ResetPassword";
import Cookies from "js-cookie";

export const clientRoutes = [
    {
        path: "/",
        children: [
            {
                path: "",
                element: Cookies.get("authToken") ? (
                    <Navigate to="/dashboard/courses" replace />
                ) : (
                    <Navigate to="/courses" replace />
                ),
            },

            {
                path: "courses",
                element: Cookies.get("authToken") ? (
                    <Navigate to="/dashboard/courses" replace />
                ) : (
                    <AllCourse />
                ),
            },
            {
                path: "dashboard",
                element: <Sidebar />,
                children: [
                    {
                        path: "",
                        element: (
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "my_course",
                        element: (
                            <ProtectedRoute>
                                <MyCourse />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "courses",
                        element: (
                            <ProtectedRoute>
                                <AllCourse />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "my_course/:id",
                        element: (
                            <ProtectedRoute>
                                <MyCourseContent />
                            </ProtectedRoute>
                        ),
                    },

                    {
                        path: "profile",
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "jobs",
                        element: (
                            <ProtectedRoute>
                                <Jobs />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "admin/upload",
                        element: <Admin />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "register", element: <Register /> },
            {
                path: "login",
                element: Cookies.get("authToken") ? (
                    <Navigate to="/courses" replace />
                ) : (
                    <Login />
                ),
            },
            { path: "forget_password", element: <ForgetPassword /> },
            { path: "reset_password", element: <ResetPassword /> },
        ],
    },
];
