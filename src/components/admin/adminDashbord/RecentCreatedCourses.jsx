import CustomTable from "../../common/CustomTable";
import { CoursesColumn } from "./CoursesColumn";

const RecentCreatedCourses = ({ courses, fetchingAllCourse }) => {
    const slicedCourses = courses.slice(0, 3);
    return (
        <div className="">
            <h3 className="text-lg sm:text-2xl my-6 font-[700] text-[#002058]">
                Recently Created Courses
            </h3>

            <CustomTable
                isPaginated={false}
                data={slicedCourses}
                columns={CoursesColumn}
                showAnimation={fetchingAllCourse}
            />

        </div>
    )
};

export default RecentCreatedCourses;
