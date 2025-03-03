import React, { useEffect, useState } from "react";
import { RecentCourse } from "./../../components/dashboard/RecentCourse";
import { CourseStatBox } from "./../../components/dashboard/CourseStatBox";
import { useGlobalContext } from "../../context/ContextExport";

const Dashboard = () => {
    const { enrolledCourses, getEnrolledCourses, enrollCoursesFunc } =
        useGlobalContext();
    const [activeCourses, setActiveCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);

    const boxData = React.useMemo(
        () => [
            {
                id: 1,
                title: "Enrolled Courses",
                value: enrolledCourses?.length,
            },
            {
                id: 2,
                title: "Active Courses",
                value: activeCourses?.length,
            },
            {
                id: 3,
                title: "Completed Courses",
                value: completedCourses?.length,
            },
        ],
        [enrolledCourses, activeCourses, completedCourses]
    );

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    useEffect(() => {
        const courseId = localStorage.getItem("courseId");
        if (courseId) {
            enrollCoursesFunc(courseId);
            localStorage.removeItem("courseId");
        }
    }, [enrollCoursesFunc]);

    useEffect(() => {
        const active = enrolledCourses?.filter((course) => course.isActive);
        setActiveCourses(active);

        const completed = enrolledCourses?.filter(
            (course) => course.isActive === "completed"
        );
        setCompletedCourses(completed);
    }, [enrolledCourses]);

    return (
        <div className="">
            <CourseStatBox boxData={boxData} />
            <RecentCourse courses={enrolledCourses} />
        </div>
    );
};

export default Dashboard;
