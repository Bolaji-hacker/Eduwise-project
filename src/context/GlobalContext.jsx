import { useEffect, useState } from "react";
import { GlobalContext } from "./ContextExport";
import {
    AddAdmin,
    addToWatch,
    courseContent,
    creatAdmin,
    createCourse,
    createLessons,
    createQuiz,
    deleteCourse,
    deleteQuiz,
    editCourse,
    editLessons,
    editQuiz,
    enrollCourse,
    getAllCourse,
    getAllUser,
    getEnrolledCourse,
    getLecturerCourses,
    getSingleCourse,
    getStudentNo,

    getUserDetails,
    manageAdmin,
    publishQuiz,
    submitQuiz,
    updateUser,
} from "../lib/services";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const GlobalContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLecturer, setIsLecturer] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [studentCount, setStudentCount] = useState("");
    // const [isEditLessons, setIsEditLessons] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    // get user details
    const [gettingUserRole, setGettingUserRole] = useState(false)

    const getUserRole = async () => {
        setGettingUserRole(true)
        try {
            const res = await getUserDetails();
            setUserProfile(res?.user);
            setUserRole(res?.user?.role);
        } catch (error) {
            console.error(error);
        } finally {
            setGettingUserRole(false)
        }
    };
    useEffect(() => {

        getUserRole()
    }, [])


    const getUser = async () => {
        try {
            const res = await getUserDetails();
            setUserProfile(res?.user);
            setUserRole(res?.user?.role);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const roleType = Cookies.get("userRole");
        setIsLecturer(roleType === "lecturer")
        setIsAdmin(roleType === "admin")
        setIsSuperAdmin(roleType === "super_admin")
    }, []);

    // useEffect(() => {
    //     getUser()
    // }, [])


    // user roles 
    useEffect(() => {
        setIsLecturer(userRole === "lecturer")
        setIsAdmin(userRole === "admin")
        setIsSuperAdmin(userRole === "super_admin")
    }, [userRole])



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
            setEnrolledCourses(res?.courses);
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
    const enrollCoursesFunc = async (courseId) => {
        setEnrolling(true);
        try {
            const res = await enrollCourse(courseId);
            toast.success(res?.message);
            // if (path === "/courses" || path === "/dashboard") {
            getEnrolledCourses();
            // }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            console.error(error);
        } finally {
            setEnrolling(false);
        }
    };

    // //  Get jobs
    // const [jobs, setJobs] = useState([]);
    // const [fetchingJobs, setFetchingJobs] = useState(false);
    // const getJobs = async () => {
    //     setFetchingJobs(true);
    //     try {
    //         const res = await getSuggestJobs();
    //         setJobs(res?.jobs);
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message || error?.response?.data?.error);
    //         console.error(error);
    //     } finally {
    //         setFetchingJobs(false);
    //     }
    // };
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
            // toast.error(error?.response?.data?.message || error?.response?.data?.error);
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
            getLecturerCoursesFunc()
            getCourses()
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            setIsDeletingcourse(false);
        }
    };

    // CREATE COURSE
    const handleCreateCourse = async (credentials, successFunc) => {
        setIsEditing(true)
        try {
            const res = await createCourse(credentials);
            // console.log(response);
            successFunc?.(res)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };

    // edit COURSE
    const handleEditCourse = async (courseId, credentials, successFunc) => {
        setIsEditing(true)
        try {
            const response = await editCourse(courseId, credentials);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };




    // CRETE COURSE Lessons
    const handleAddCourseLessons = async (courseId, credentials, successFunc) => {
        setIsEditing(true)
        const payload = credentials

        console.log("payload", payload)

        try {
            const response = await createLessons(courseId, payload);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };



    // handle edit course lessons
    const editCourseLessons = async (courseId, credentials, successFunc) => {
        const payload = credentials
        setIsEditing(true)
        //    console.log("payload", payload)

        try {
            const response = await editLessons(courseId, payload);
            // console.log(response);
            successFunc?.(response)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };


    // handle createQuizz 
    const createQiuzFunc = async (courseId, credentials, successFunc) => {
        const payload = {
            questions: credentials?.quizzes
        }
        setIsEditing(true)
        // console.log("payload", payload)

        try {
            const response = await createQuiz(courseId, payload);
            console.log(response);
            successFunc?.(response)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };

    // HANDLE GET QUIZZ FOR STUDENTS.
    const [clientQuiz, setClientQuiz] = useState([])
    const [fetchingAllQuiz, setFetchingAllQuiz] = useState(false)
    const getQuiz = async () => {
        setFetchingAllQuiz(true);
        try {
            const res = await getEnrolledCourse();
            // setEnrolledCourses(res?.enrolledCourses);
            // console.log("quizz res", res)
            const allCorses = res?.courses
            const coursesWithQuiz = allCorses?.filter((item) => item?.quizzes?.[0]?.published)
            setClientQuiz(coursesWithQuiz)

        } catch (error) {
            console.error(error);
        } finally {
            setFetchingAllQuiz(false);
        }

    }

    // handle get singleQUiz
    const [singleQuiz, setSingleQuiz] = useState([])
    const [fetchingSingleQuiz, setFetchingSingleQuiz] = useState(false)
    const getSingleQuizFunc = async (courseId) => {
        setFetchingSingleQuiz(true);
        try {
            const res = await getSingleCourse(courseId);
            setSingleQuiz(res?.course?.quizzes?.[0]?.questions);
            setSingleCourse(res?.course);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingSingleQuiz(false);
        }

    }

    // Handle delete quizz 
    const [isDeletingQuiz, setIsDeletingQuiz] = useState(false);

    const deleteQuizFunc = async (courseId, quizId) => {
        setIsDeletingQuiz(true);
        try {
            const res = await deleteQuiz(courseId, quizId);

            console.log(res);
            toast.success(res?.message);
            getCourses()
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            setIsDeletingQuiz(false);
        }
    };

    // Publishing quizz
    const [isPublishingQuiz, setIsPublishingQuiz] = useState(false);

    const publishQuizFunc = async (courseId, quizId) => {
        setIsPublishingQuiz(true);
        try {
            const res = await publishQuiz(courseId, quizId);
            toast.success(res?.message);
            getLecturerCoursesFunc()
            getCourses()
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            setIsPublishingQuiz(false);
        }
    };

    // handleEditQuiz editQuiz
    const handleEditQuiz = async (courseId, quizId, credentials, successFunc) => {
        const payload = { questions: credentials?.quizzes }
        setIsEditing(true)
        //    console.log("payload", payload)
        try {
            const response = await editQuiz(courseId, quizId, payload);
            // toast.success(response?.message);
            successFunc?.(response)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsEditing(false)
        }
    };


    // handleSubmitQuiz 
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false)
    const [quizResult, setQuizResult] = useState(null)
    const handleSubmitQuiz = async (courseId, quizId, credentials, successFunc) => {
        const payload = { answers: credentials }
        setIsSubmittingQuiz(true)

        // console.log("payload", payload)
        try {
            const response = await submitQuiz(courseId, quizId, payload);
            toast.success(response?.message);
            successFunc?.(response)
            setQuizResult(response)
            setRunning(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            throw error;
        } finally {
            setIsSubmittingQuiz(false)
        }
    };

    const tryAgainFunc = () => {
        // setRunning(true)
        setTime(0)
        setQuizResult(null)
        // setCurrentQuestionIndex(0)
        // setAnswers(Array(singleQuiz?.length).fill(null));
    }

    // creatAdmin
    const creatAdminFunc = async (courseId) => {
        // setIsPublishingQuiz(true);
        try {
            const res = await creatAdmin(courseId);
            toast.success(res?.message);
            console.log("creatAdmin", res)
            // getCourses()
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            // setIsPublishingQuiz(false);
        }
    };


    // getLecturerCourses
    const [lecturerCourses, setLecturerCourses] = useState([])
    const getLecturerCoursesFunc = async (courseId) => {
        setFetchingAllCourse(true);
        try {
            const res = await getLecturerCourses(courseId);
            //  setSingleQuiz(res?.course?.quizzes?.[0]?.questions);
            setLecturerCourses(res?.courses);
            console.log(res);
            (res?.course);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingAllCourse(false);
        }

    }
    // get all users and put them in their categories 
    const [lecturers, setLecturers] = useState([])
    const [admins, setAdmins] = useState([])
    const [students, setStudents] = useState([])
    const [fetchingUsers, setFetchingUsers] = useState(false)
    const getUsersFunc = async () => {
        setFetchingUsers(true)
        try {
            const res = await getAllUser();
            const teachers = res?.users?.filter((item) => item?.role === "lecturer")
            const admins = res?.users?.filter((item) => item?.role === "admin")
            const student = res?.users?.filter((item) => item?.role === "user")

            setLecturers(teachers)
            setAdmins(admins)
            setStudents(student)
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingUsers(false)
        }
    };


    // add admin deatils 
    const [addingAdmin, setAddingAdmin] = useState(false)
    const AddAdminFunc = async (payload, successFunc) => {
        setAddingAdmin(true);
        try {
            const res = await AddAdmin(payload);
            toast.success(res?.message);
            getUsersFunc()
            successFunc?.(res)
        } catch (error) {

            toast.error(error?.response?.data?.message || error?.response?.data?.error);


        } finally {
            setAddingAdmin(false);
        }
    };
    // manageAdmin
    const [managingAdmin, setManagingAdmin] = useState(false)
    const manageAdminFunc = async (courseId) => {
        setManagingAdmin(true);
        try {
            const res = await manageAdmin(courseId);
            toast.success(res?.message);
            // console.log("manage admin", res)
            getUsersFunc()
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            setManagingAdmin(false);
        }
    };

    // addToWatch

    const addToWatchFunc = async (courseId, sectionTitle, lessonTitle) => {
        // setManagingAdmin(true);
        try {
            const res = await addToWatch(courseId, sectionTitle, lessonTitle);
            toast.success(res?.message);
            console.log("manage admin", res)
            // getUsersFunc()
            getCourseContent(currentCourse?._id)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error);
            // console.error(error);
        } finally {
            // setManagingAdmin(false);
        }
    }


    // LogOut
    const Logout = () => {
        Cookies.remove("authToken");
        Cookies.remove("userRole");
        window.location.href = "/login";
    };
    const passedValue = {
        // user profile
        userProfile,
        userRole,
        setUserRole,
        isLecturer,
        isAdmin,
        isSuperAdmin,
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

        // // get jobs
        // getJobs,
        // jobs,
        // fetchingJobs,
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
        isEditing,
        handleEditCourse,
        // edit course conent 
        editCourseLessons,
        // isEditLessons,
        // Lessons 
        handleAddCourseLessons,
        // Student Count
        studentCount,
        getStudentNoFunc,
        //Quiz
        createQiuzFunc,
        getQuiz,
        clientQuiz,
        fetchingAllQuiz,
        isDeletingQuiz,
        deleteQuizFunc,
        isPublishingQuiz,
        publishQuizFunc,
        getSingleQuizFunc,
        fetchingSingleQuiz,
        singleQuiz,
        handleEditQuiz,
        // submit quizz 
        handleSubmitQuiz,
        isSubmittingQuiz,
        quizResult,
        setQuizResult,
        running,
        setRunning,
        time,
        setTime,
        tryAgainFunc,
        // crete admin 
        creatAdminFunc,

        // leacturer
        getLecturerCoursesFunc,
        lecturerCourses,
        // get all users
        getUsersFunc,
        // Add admin 
        addingAdmin,
        AddAdminFunc,
        lecturers,
        admins,
        students,
        fetchingUsers,
        // manage admin 
        manageAdminFunc,
        managingAdmin,
        addToWatchFunc,
        gettingUserRole,
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
