import CustomTable from "../../components/common/CustomTable";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/ContextExport";
import { QuizColumn } from "../../components/admin/AdminQuiz/QuizColumn";

const Quiz = () => {
    const { getCourses, courses, fetchingAllCourse, getLecturerCoursesFunc, lecturerCourses, isLecturer } =
        useGlobalContext();

    useEffect(() => {
        getCourses();
        getLecturerCoursesFunc()
    }, []);



    return (
        <div className="">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center justify-between">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Quiz
                </h3>
            </div>

            {/* children */}
            <div className="" >


                <CustomTable
                    isPaginated={false}
                    data={isLecturer ? lecturerCourses : courses}
                    columns={QuizColumn}
                    showAnimation={fetchingAllCourse}
                />

            </div>

        </div>
    )
};

export default Quiz;
