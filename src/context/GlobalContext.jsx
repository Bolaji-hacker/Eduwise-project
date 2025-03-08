import { useState } from "react";
import { GlobalContext } from "./ContextExport";
import {
    courseContent,
    createCourse,
    createLessons,
    deleteCourse,
    editCourse,
    editLessons,
    enrollCourse,
    getAllCourse,
    getEnrolledCourse,
    getSingleCourse,
    getStudentNo,
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
    const [studentCount, setStudentCount] = useState("");
    
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
    
    // get user details
    const getStudentNoFunc = async () => {
        try {
            const res = await getStudentNo();
            setStudentCount(res?.count);
            
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

    // get single Courses
    const [fetchingSingleCourse, setFetchingSingleCourse] = useState(false);
    const [singleCourse, setSingleCourse] = useState([]);
    const getSingleCourseFunc = async (courseId) => {
        setFetchingSingleCourse(true);
        try {
            const res = await getSingleCourse(courseId);
            // console.log(res);
            setSingleCourse(res?.course);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingSingleCourse(false);
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

    // delete course 
    const [isDeletingcourse, setIsDeletingcourse] = useState(false);

    const deleteCourseFunc = async (courseId) => {
        setIsDeletingcourse(true);
        try {
            const res = await deleteCourse(courseId);

            console.log(res);
            toast.success(res?.message);
            getCourses()
        } catch (error) {
            toast.error(error?.response?.data?.message);
            // console.error(error);
        } finally {
            setIsDeletingcourse(false);
        }
    };

    // CREATE COURSE
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
    
    // edit COURSE
    const handleEditCourse = async (courseId,credentials, successFunc) => {
        try {
            const response = await editCourse(courseId, credentials);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    };




    // CRETE COURSE Lessons
    const handleAddCourseLessons = async (courseId, credentials, successFunc) => {
        const payload =  credentials 
        
       console.log("payload", payload)

        try {
            const response = await createLessons(courseId, payload);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    };
    
    
    
    // handle edit course lessons
    const [isEditLessons, setIsEditLessons] = useState(false);
    
    const editCourseLessons = async (courseId, credentials, successFunc) => {
        const payload =  credentials 
        setIsEditLessons(true)
    //    console.log("payload", payload)

        try {
            const response = await editLessons(courseId, payload);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        } finally {
             setIsEditLessons(false)
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
        // get single course
        fetchingSingleCourse,
        singleCourse,
        getSingleCourseFunc,
        // delete course
        deleteCourseFunc,
        isDeletingcourse,
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
        // edit course 
        handleEditCourse,
        // edit course conent 
        editCourseLessons,
        isEditLessons,
        // Lessons 
        handleAddCourseLessons,
        // Student Count
        studentCount,
        getStudentNoFunc,
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
