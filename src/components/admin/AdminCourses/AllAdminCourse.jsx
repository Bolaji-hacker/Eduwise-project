import { useEffect } from "react";
import { useGlobalContext } from "../../../context/ContextExport";
import { CourseCard } from "../../common/CourseCard";
import { Link } from "react-router-dom";


const AllAdminCourse = () => {
    const { courses, getCourses } = useGlobalContext()

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center justify-between">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Courses
                </h3>

                <Link to="/admin_dashboard/create_courses">
                    <button>
                        Create Course
                    </button>
                </Link>

            </div>
            <div className="px-4 md:px-6 py-6 min-h-[60vh] grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    courses?.map((item, i) => {
                        return (
                            <CourseCard
                                key={i}
                                item={item}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AllAdminCourse;
