import { Navigate } from "react-router-dom";
import Sidebar from "../components/common/SIdeBar";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/client/Profile";
// import MyCourseContent from "../pages/client/MyCourseContent";
import AllCourse from "../pages/client/AllCourse";
import Cookies from "js-cookie";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllAdminCourse from "../components/admin/AdminCourses/AllAdminCourse";
import CreateCourse from "../components/admin/AdminCourses/CreateCourse";
import ManageLessons from "../components/admin/AdminCourses/ManageLessons";
import Quiz from "../pages/admin/Quiz";

export const adminRoutes = [
    {
        path: "/",
        children: [
            {
                path: "",
                element: Cookies.get("authToken") ? (
                    <Navigate to="/admin_dashboard/admin_my_course" replace />
                ) : (
                    <Navigate to="/courses" replace />
                ),
            },

            {
                path: "admin_courses",
                element: Cookies.get("authToken") ? (
                    <Navigate to="/admin_dashboard/admin_my_course" replace />
                ) : (
                    <AllCourse />
                ),
            },
            {
                path: "admin_dashboard",
                element: <Sidebar />,
                children: [
                    {
                        path: "",
                        element: (
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "admin_my_course",
                        element: (
                            <ProtectedRoute>
                                <AllAdminCourse />
                            </ProtectedRoute>
                        ),
                    },

                    {
                        path: "manage_lessons/:courseId",
                        element: (
                            <ProtectedRoute>
                                <ManageLessons />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit_lessons/:courseId",
                        element: (
                            <ProtectedRoute>
                                <ManageLessons />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "create_courses",
                        element: (
                            <ProtectedRoute>
                                <CreateCourse />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit_courses/:courseId",
                        element: (
                            <ProtectedRoute>
                                <CreateCourse />
                            </ProtectedRoute>
                        ),
                    },


                    {
                        path: "admin_profile",
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "admin_quiz",
                        element: (
                            <ProtectedRoute>
                                <Quiz />
                            </ProtectedRoute>
                        ),
                    },


                ],
            },
        ],
    },
    // {
    //     path: "/",
    //     element: <AuthLayout />,
    //     children: [
    //         { path: "register", element: <Register /> },
    //         {
    //             path: "login",
    //             element: Cookies.get("authToken") ? (
    //                 <Navigate to="/courses" replace />
    //             ) : (
    //                 <Login />
    //             ),
    //         },
    //         { path: "forget_password", element: <ForgetPassword /> },
    //         { path: "reset_password", element: <ResetPassword /> },
    //     ],
    // },
];
