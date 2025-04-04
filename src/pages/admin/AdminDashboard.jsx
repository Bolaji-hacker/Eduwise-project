import React, { useEffect } from "react";

import { CourseStatBox } from "../../components/dashboard/CourseStatBox";
import { useGlobalContext } from "../../context/ContextExport";
import RecentCreatedCourses from "../../components/admin/adminDashbord/RecentCreatedCourses";

const AdminDashboard = () => {
    const { enrolledCourses, getCourses, courses, lecturerCourses, fetchingAllCourse, studentCount,
        getStudentNoFunc, getLecturerCoursesFunc, isLecturer, userRole } =
        useGlobalContext();


    const boxData = React.useMemo(
        () => [
            {
                id: 1,
                title: "Total Students",
                value: studentCount,
            },
            {
                id: 2,
                title: "Total Courses",
                value: isLecturer ? lecturerCourses?.length : courses?.length,
            },
            {
                id: 3,
                title: "Active Courses",
                value: isLecturer ? lecturerCourses?.length : courses?.length,
            },
        ],
        [courses, enrolledCourses]
    );

    useEffect(() => {
        // if (isLecturer) {
        // } else {
        // }
        getCourses();
        getStudentNoFunc()
        getLecturerCoursesFunc()
    }, [userRole]);





    return (
        <div className="">
            <CourseStatBox boxData={boxData} />
            <RecentCreatedCourses courses={isLecturer ? lecturerCourses : courses} fetchingAllCourse={fetchingAllCourse} />
        </div>
    );
};

export default AdminDashboard;
