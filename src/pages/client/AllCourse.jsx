import { useEffect, useState } from "react";
import HeaderNav from "../../components/common/HeaderNav";
import { useAuthContext, useGlobalContext } from "../../context/ContextExport";
import AllCourses from "../../components/courses/AllCourses";

const AllCourse = () => {
    const { getCourses, enrolledCourses, getEnrolledCourses } =
        useGlobalContext();
    const { isLoggedIn } = useAuthContext();
    const [enrollId, setEnrollId] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        getCourses();
        getEnrolledCourses();
    }, []);

    useEffect(() => {
        let courseId = [];
        enrolledCourses?.map((item) => courseId.push(item?._id));
        setEnrollId(courseId);
    }, [enrolledCourses]);
    // console.log(enrollId);

    // console.log(enrollId);

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <HeaderNav
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                path={isLoggedIn ? "" : "full"}
            />

            <AllCourses enrollId={enrollId} />
        </div>
    );
};

export default AllCourse;
