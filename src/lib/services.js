import apiClient from "./axiosInstance";

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post("/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};
export const forgetPassword = async (credentials) => {
    try {
        const response = await apiClient.post("/forgot-password", credentials);
        return response.data;
    } catch (error) {
        console.error("Error Forget password:", error);
        throw error;
    }
};
export const resetPassword = async (token, credentials) => {
    try {
        const response = await apiClient.patch(
            `/reset-password/${token}`,
            credentials
        );
        return response.data;
    } catch (error) {
        console.error("Error Forget password:", error);
        throw error;
    }
};

// User Registration
export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post("/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error  registerUser:", error);
        throw error;
    }
};
// get-user-details
export const getUserDetails = async () => {
    try {
        const response = await apiClient.get(`/get-user-details`);
        return response.data;
    } catch (error) {
        console.error("Error fetching getUserDetails:", error);
        throw error;
    }
};
// http://localhost:3000/api/total-students
// get-student no
export const getStudentNo = async () => {
    try {
        const response = await apiClient.get(`/total-students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};

// get-all-courses
export const getAllCourse = async () => {
    try {
        const response = await apiClient.get(`/all-courses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all course:", error);
        throw error;
    }
};

// get-single-courses
export const getSingleCourse = async (courseId) => {
    try {
        const response = await apiClient.get(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all course:", error);
        throw error;
    }
};
// delete-single-courses
export const deleteCourse = async (courseId) => {
    try {
        const response = await apiClient.delete(`/delete-course/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all course:", error);
        throw error;
    }
};


// enroll for a course
export const enrollCourse = async (courseId) => {
    try {
        const response = await apiClient.post(`/enroll/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching enroll course:", error);
        throw error;
    }
};
// get enrolled courses
export const getEnrolledCourse = async () => {
    try {
        const response = await apiClient.get(`/users/courses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};

// mark lesson as watch
export const watchLessson = async (courseId, sectionTitle, lessonTitle) => {
    try {
        const response = await apiClient.patch(
            `/courses/${courseId}/sections/${sectionTitle}/lessons/${lessonTitle}/watched"`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};
// get suggestted job
export const getSuggestJobs = async () => {
    try {
        const response = await apiClient.get(`/suggest-job/interest`);
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

// update user profile
export const updateUser = async (userData) => {
    try {
        const formData = new FormData();
        formData.append("fullName", userData.fullName);
        formData.append("email", userData.email);
        formData.append("userImage", userData.userImage);
        userData.interests.forEach((interest) => {
            formData.append("interests", interest);
        });

        const response = await apiClient.patch(`/update/user`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
};

// courses content
export const courseContent = async (courseId) => {
    try {
        const response = await apiClient.get(`/users/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};


// create course

export const createCourse = async (credentials) => {
    try {
        const response = await apiClient.post("/create-course", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// create lessons 
export const createLessons = async (courseId, credentials) => {
    try {
        const response = await apiClient.post(`/add-content/${courseId}`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// edit course 
export const editCourse = async (courseId, credentials) => {
    try {
        const response = await apiClient.patch(`/edit-course/${courseId}`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// edit lessons 
export const editLessons = async (courseId, credentials) => {
    try {
        const response = await apiClient.patch(`/edit-content/${courseId}`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error in edit quizz:", error);
        throw error;
    }
};


// create Quiz 
export const createQuiz = async (courseId, credentials) => {
    try {
        const response = await apiClient.post(`/courses/${courseId}/quizzes`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error in Create Quizz :", error);
        throw error;
    }
};

// delete Quizz
export const deleteQuiz = async (courseId, quizId) => {
    try {
        const response = await apiClient.delete(`/${courseId}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleteing  course:", error);
        throw error;
    }
};

// Publish Quizz
export const publishQuiz = async (courseId, quizId) => {
    try {
        const response = await apiClient.patch(`/${courseId}/quizzes/${quizId}/publish`);
        return response.data;
    } catch (error) {
        console.error("Error publishing quizz :", error);
        throw error;
    }
};

// edit quizz by id 
export const editQuiz = async (courseId, quizId, credentials) => {
    try {
        const response = await apiClient.put(`/${courseId}/quizzes/${quizId}`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error in edit quizz:", error);
        throw error;
    }
};

// submit quizzz
export const submitQuiz = async (courseId, quizId, credentials) => {
    try {
        const response = await apiClient.post(`/courses/${courseId}/quizzes/${quizId}/submit`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error in edit quizz:", error);
        throw error;
    }
};

// create lectturer
export const creatAdmin = async (credentials) => {
    try {
        const response = await apiClient.post(`/admin/create-admin`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error in Create Quizz :", error);
        throw error;
    }
};


// courses content
export const getLecturerCourses = async () => {
    try {
        const response = await apiClient.get(`/lecturer/courses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};


// Get all users
export const getAllUser = async () => {
    try {
        const response = await apiClient.get(`/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};


// Add Admin
export const AddAdmin = async (credentials) => {
    try {
        const response = await apiClient.post("/create-admin", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// /users/:id/toggle-status
export const manageAdmin = async (userId) => {
    try {
        const response = await apiClient.patch(`/users/${userId}/toggle-status`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};
// /courses/:courseId/sections/:sectionTitle/lessons/:lessonTitle/watched
export const addToWatch = async (courseId, sectionTitle, lessonTitle) => {
    try {
        const response = await apiClient.patch(`/courses/${courseId}/sections/${sectionTitle}/lessons/${lessonTitle}/watched`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};
