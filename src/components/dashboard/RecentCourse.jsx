import { CourseCard } from "./../common/CourseCard";
import { EmptyCourses } from "./EmptyCourses";

export function RecentCourse({ courses }) {
    return (
        <div className="">
            <h3 className="text-lg sm:text-2xl my-6 font-[700] text-[#002058]">
                Recently Enrolled Courses
            </h3>

            {courses?.length > 0 ? (
                <div className="grid sm:grid-cols-3 gap-5">
                    {courses?.map((item, i) => {
                        return <CourseCard key={i} item={item} />;
                    })}
                </div>
            ) : (
                <EmptyCourses />
            )}
        </div>
    );
}
