import { Navigate } from "react-router-dom";
import Sidebar from "../components/common/SIdeBar";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Profile from "../pages/client/Profile";
// import MyCourseContent from "../pages/client/MyCourseContent";
import AllCourse from "../pages/client/AllCourse";
import Cookies from "js-cookie";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllAdminCourse from "../components/admin/AdminCourses/AllAdminCourse";
import CreateCourse from "../components/admin/AdminCourses/CreateCourse";
import ManageLessons from "../components/admin/AdminCourses/ManageLessons";
import Quiz from "../pages/admin/Quiz";
import ManageQuiz from "../components/admin/AdminQuiz/ManageQuiz";

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
                            <AdminProtectedRoute>
                                <AdminDashboard />
                            </AdminProtectedRoute>
                        ),
                    },
                    {
                        path: "admin_my_course",
                        element: (
                            <AdminProtectedRoute>
                                <AllAdminCourse />
                            </AdminProtectedRoute>
                        ),
                    },

                    {
                        path: "manage_lessons/:courseId",
                        element: (
                            <AdminProtectedRoute>
                                <ManageLessons />
                            </AdminProtectedRoute>
                        ),
                    },
                    {
                        path: "edit_lessons/:courseId",
                        element: (
                            <AdminProtectedRoute>
                                <ManageLessons />
                            </AdminProtectedRoute>
                        ),
                    },
                    {
                        path: "create_courses",
                        element: (
                            <AdminProtectedRoute>
                                <CreateCourse />
                            </AdminProtectedRoute>
                        ),
                    },
                    {
                        path: "edit_courses/:courseId",
                        element: (
                            <AdminProtectedRoute>
                                <CreateCourse />
                            </AdminProtectedRoute>
                        ),
                    },


                    {
                        path: "admin_profile",
                        element: (
                            <AdminProtectedRoute>
                                <Profile />
                            </AdminProtectedRoute>
                        ),
                    },
                    {
                        path: "admin_quiz",
                        element: (
                            <AdminProtectedRoute>
                                <Quiz />
                            </AdminProtectedRoute>
                        ),

                    },
                    {
                        path: "admin_quiz/create_quizz/:courseId",
                        element: (
                            <AdminProtectedRoute>
                                <ManageQuiz />
                            </AdminProtectedRoute>
                        ),

                    },
                    {
                        path: "admin_quiz/edit_quiz/:courseId/:quizId",
                        element: (
                            <AdminProtectedRoute>
                                <ManageQuiz />
                            </AdminProtectedRoute>
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
