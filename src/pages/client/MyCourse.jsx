import EnrolledCourses from "../../components/courses/EnrolledCourses";

const MyCourse = () => {
    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Enrolled Courses
                </h3>
            </div>
            <div className="px-4 md:px-6 py-6 min-h-[60vh]">
                <EnrolledCourses />
            </div>
        </div>
    );
};

export default MyCourse;
