import CreateCourseLayout from "../../../Layout/CreateCourseLayout";
import CourseDetailsForm from "./CourseDetailsForm";


// const CreateCourse = () => {
const CreateCourse = () => {

    return (
        <CreateCourseLayout title="Create Course" currentStep={1} noOfSteps={2}  >
            <div className="p-5 ">
                <CourseDetailsForm />
            </div>
        </CreateCourseLayout>

    );
};

// export default CreateCourse;</div>
// };

export default CreateCourse;
