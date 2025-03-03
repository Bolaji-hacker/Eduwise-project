import { useEffect, useState } from "react";
// import { enrolledCourses } from "../../lib/dummyData";
import { CourseCard } from "../common/CourseCard";
import { EmptyCourses } from "../dashboard/EmptyCourses";
import { Button } from "@headlessui/react";
import { useGlobalContext } from "../../context/ContextExport";
import PreLoader from "../common/PreLoader";

const EnrolledCourses = () => {
    const [activeCourses, setActiveCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);

    const { getEnrolledCourses, enrolledCourses, fetchingEnrolledCourse } =
        useGlobalContext();

    const [courseNav, setCourseNav] = useState(1);

    const courseNavData = [
        {
            id: 1,
            title: "Enrolled Courses",
            value: 1,
            navDes: enrolledCourses?.length,
        },
        {
            id: 2,
            title: "Active Courses",
            value: 2,
            navDes: activeCourses?.length,
        },
        {
            id: 3,
            title: "Completed Courses",
            value: 3,
            navDes: completedCourses?.length,
        },
    ];

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    useState(() => {
        const active = enrolledCourses?.filter((course) => course.isActive);
        setActiveCourses(active);

        const completed = enrolledCourses?.filter(
            (course) => course.isActive === "completed"
        );
        setCompletedCourses(completed);
    }, [enrolledCourses]);

    return (
        <div>
            <div className="mb-6  flex flex-col sm:flex-row gap-5  ">
                {courseNavData?.map(({ id, title, value, navDes }) => {
                    return (
                        <Button
                            className={` px-[0.9375rem] py-3 rounded-[0.3125rem] ${
                                courseNav === value
                                    ? "bg-[#ff4667] text-white"
                                    : "text-[#e9ecef] bg-[#685f78]"
                            }`}
                            key={id}
                            onClick={() => setCourseNav(value)}
                        >
                            {title} ({navDes > 10 ? navDes : `0${navDes}`})
                        </Button>
                    );
                })}
            </div>
            {/* course details */}
            {fetchingEnrolledCourse ? (
                <PreLoader />
            ) : (
                <>
                    {courseNav === 1 && (
                        <>
                            {enrolledCourses?.length > 0 ? (
                                <div className="grid sm:grid-cols-3 gap-5">
                                    <>
                                        {enrolledCourses
                                            ?.slice(0, 6)
                                            ?.map((item, i) => {
                                                return (
                                                    <CourseCard
                                                        key={i}
                                                        item={item}
                                                    />
                                                );
                                            })}
                                    </>
                                </div>
                            ) : (
                                <EmptyCourses
                                    text={"You haven't enroll for  any  course"}
                                />
                            )}
                        </>
                    )}
                    {/* active courses */}
                    {courseNav === 2 && (
                        <>
                            {activeCourses?.length > 0 ? (
                                <div className="grid sm:grid-cols-3 gap-5">
                                    <>
                                        {activeCourses?.map((item, i) => {
                                            return (
                                                <CourseCard
                                                    key={i}
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </>
                                </div>
                            ) : (
                                <EmptyCourses
                                    text={"You don't have any active course"}
                                />
                            )}
                        </>
                    )}
                    {courseNav === 3 && (
                        <>
                            {completedCourses?.length > 0 ? (
                                <div className="grid sm:grid-cols-3 gap-5">
                                    <>
                                        {completedCourses?.map((item, i) => {
                                            return (
                                                <CourseCard
                                                    key={i}
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </>
                                </div>
                            ) : (
                                <EmptyCourses
                                    text="You haven't completet any of your course "
                                    btn={false}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default EnrolledCourses;
