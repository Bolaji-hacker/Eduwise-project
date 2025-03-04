import React, { useEffect } from "react";

import { CourseStatBox } from "../../components/dashboard/CourseStatBox";
import { useGlobalContext } from "../../context/ContextExport";
import RecentCreatedCourses from "../../components/admin/adminDashbord/RecentCreatedCourses";

const AdminDashboard = () => {
    const { enrolledCourses, getCourses, courses, fetchingAllCourse } =
        useGlobalContext();


    const boxData = React.useMemo(
        () => [
            {
                id: 1,
                title: "Total Students",
                value: enrolledCourses?.length,
            },
            {
                id: 2,
                title: "Total Courses",
                value: courses?.length,
            },
            {
                id: 3,
                title: "Active Courses",
                value: courses?.length,
            },
        ],
        [courses, enrolledCourses]
    );

    useEffect(() => {
        getCourses();
    }, []);





    return (
        <div className="">
            <CourseStatBox boxData={boxData} />
            <RecentCreatedCourses courses={courses} fetchingAllCourse={fetchingAllCourse} />
        </div>
    );
};

export default AdminDashboard;
