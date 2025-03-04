import { useState } from "react";
import { GlobalContext } from "./ContextExport";
import {
    courseContent,
    createCourse,
    createLessons,
    enrollCourse,
    getAllCourse,
    getEnrolledCourse,
    getSuggestJobs,
    getUserDetails,
    updateUser,
} from "../lib/services";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const GlobalContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    // get user details
    const getUser = async () => {
        try {
            const res = await getUserDetails();
            setUserProfile(res?.user);
            setUserRole(res?.user?.role);
        } catch (error) {
            console.error(error);
        }
    };

    // get All Courses
    const [fetchingAllCourse, setFetchingAllCourse] = useState(false);
    const getCourses = async () => {
        setFetchingAllCourse(true);
        try {
            const res = await getAllCourse();
            setCourses(res?.allCourses);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingAllCourse(false);
        }
    };
    // get EnrolledCourses
    const [fetchingEnrolledCourse, setFetchingEnrolledCourse] = useState(false);
    const getEnrolledCourses = async () => {
        setFetchingEnrolledCourse(true);
        try {
            const res = await getEnrolledCourse();
            setEnrolledCourses(res?.enrolledCourses);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingEnrolledCourse(false);
        }
    };

    //  Enroll a Courses
    const [enrolling, setEnrolling] = useState(false);
    const enrollCoursesFunc = async (courseId, path) => {
        setEnrolling(true);
        try {
            const res = await enrollCourse(courseId);
            toast.success(res?.message);
            if (path === "/courses") {
                getEnrolledCourses();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.error(error);
        } finally {
            setEnrolling(false);
        }
    };

    //  Get jobs
    const [jobs, setJobs] = useState([]);
    const [fetchingJobs, setFetchingJobs] = useState(false);
    const getJobs = async () => {
        setFetchingJobs(true);
        try {
            const res = await getSuggestJobs();
            setJobs(res?.jobs);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.error(error);
        } finally {
            setFetchingJobs(false);
        }
    };
    // update user
    const [loadingEditProfile, setLoadingEditProfile] = useState(false);
    const updateUserProfile = async (userData, successFunc = () => { }) => {
        setLoadingEditProfile(true);
        try {
            const res = await updateUser(userData);
            toast.success(res?.message);
            getUser();
            successFunc();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEditProfile(false);
        }
    };

    // get course Content
    const [fetchingCourseContent, setFetchingCourseContent] = useState(false);
    const [currentCourseContent, setCurrentCourseContent] = useState([]);
    const [currentCourse, setCurrentCourse] = useState([]);
    const getCourseContent = async (courseId) => {
        setFetchingCourseContent(true);
        try {
            const res = await courseContent(courseId);
            console.log(res);
            setCurrentCourse(res?.course);
            setCurrentCourseContent(res?.course?.contents);
        } catch (error) {
            // toast.error(error?.response?.data?.message);
            console.error(error);
        } finally {
            setFetchingCourseContent(false);
        }
    };

    // CRETE COURSE
    const handleCreateCourse = async (credentials, successFunc) => {
        try {
            const response = await createCourse(credentials);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    };
    // CRETE COURSE Lessons
    const handleAddCourseLessons = async (courseId, credentials, successFunc) => {
        const payload = { ...credentials?.[0] }
        try {
            const response = await createLessons(courseId, payload);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    };


    // LogOut
    const Logout = () => {
        Cookies.remove("authToken");
        window.location.href = "/login";
    };
    const passedValue = {
        // user profile
        userProfile,
        userRole,
        getUser,
        //  enrolledCourses
        enrolledCourses,
        enrolling,
        getEnrolledCourses,
        // get all courses
        getCourses,
        courses,
        fetchingAllCourse,
        // enroll Courses
        fetchingEnrolledCourse,
        enrollCoursesFunc,
        // get jobs
        getJobs,
        jobs,
        fetchingJobs,
        // upadte user profie data
        updateUserProfile,
        loadingEditProfile,
        // Courses content
        fetchingCourseContent,
        getCourseContent,
        currentCourseContent,
        currentCourse,
        handleCreateCourse,
        // Lessons 
        handleAddCourseLessons,
        // Logout
        Logout,

    };
    return (
        <GlobalContext.Provider value={passedValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
