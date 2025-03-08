import { useLocation } from "react-router-dom";
import CreateCourseLayout from "../../../Layout/CreateCourseLayout";
import CourseDetailsForm from "./CourseDetailsForm";


// const CreateCourse = () => {
const CreateCourse = () => {
    const { pathname } = useLocation();
    const isEdit = pathname.includes("edit_courses");



    return (
        <CreateCourseLayout title={isEdit ? "Edit Course" : "Create Course"} currentStep={1} noOfSteps={2}  >
            <div className="p-5 ">
                <CourseDetailsForm isEdit={isEdit} />
            </div>
        </CreateCourseLayout>

    );
};

// export default CreateCourse;</div>
// };

export default CreateCourse;
