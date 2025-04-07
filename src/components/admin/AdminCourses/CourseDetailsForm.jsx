import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikCustomInput from "../../common/FormikCustomInput";
// import { FormikCheckbox } from "../../common/CustomCheckBox";
import { useGlobalContext } from "../../../context/ContextExport";
import toast from "react-hot-toast";
import CustomButton from "../../common/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const CourseDetailsForm = ({ isEdit }) => {

    const navigate = useNavigate();
    const { courseId } = useParams();
    const { getSingleCourseFunc, singleCourse: courseData, isEditing, handleCreateCourse, handleEditCourse, fetchingSingleCourse } = useGlobalContext();
    const [formValues, setFormValues] = useState([]);


    useEffect(() => {
        if (courseId) {
            getSingleCourseFunc(courseId)
        }
    }, []);

    useEffect(() => {
        if (isEdit) {
            setFormValues(initialValuesEdit)
        } else {

            setFormValues(initialValues)
        }
    }, [courseData]);



    const initialValues = {
        price: "",
        objectives: "",
        description: "",
        title: "",
        duration: "",
        enrolledStudents: "",
        teacher: "",
        // targetAudience: [],
        imageUrl: "",
    };

    const initialValuesEdit = {
        price: courseData?.price || "",
        objectives: courseData?.objectives || "",
        description: courseData?.description || "",
        title: courseData?.title || "",
        duration: courseData?.duration || "",
        enrolledStudents: courseData?.enrolledStudents || "",
        teacher: courseData?.teacher || "",
        // targetAudience: courseData?.targetAudience || [],
        imageUrl: courseData?.imageUrl || "",
    };


    const validationSchema = Yup.object({
        price: Yup.number().required("Price is required"),
        objectives: Yup.string().required("Objectives are required"),
        description: Yup.string().required("Description is required"),
        title: Yup.string().required("Title is required"),
        duration: Yup.number().required("Duration is required"),
        enrolledStudents: Yup.number().required("Enrolled Students is required"),
        // teacher: Yup.string().required("Teacher is required"),
        // targetAudience: Yup.array().of(Yup.string()).required("Target Audience is required"),
        imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        const successFunc = (res) => {
            navigate(`${isEdit ? `/admin_dashboard/edit_lessons/${res?.course?._id}` : `/admin_dashboard/manage_lessons/${res?.course?._id}`}`);
            toast.success(`${isEdit ? "Course Updated Successfully" : "Course Created Successfully"}`);
            setSubmitting(false);
        }
        const payload = {
            // ...courseData,
            ...values,


        }


        if (isEdit) {
            handleEditCourse(courseData?._id, payload, successFunc)
        } else {

            handleCreateCourse(payload, successFunc);
        }
    };

    // const interestsData = [
    //     "Machine Learning",
    //     "Robotics",
    //     "Natural Language Processing (NLP)",
    //     "Cognitive Computing",
    //     "AI in Gaming",
    // ];
    console.log("isEditing", isEditing);

    return (
        <div>
            <div>

                {
                    fetchingSingleCourse ? "Loading..." :
                        <Formik
                            enableReinitialize
                            initialValues={formValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className="space-y-6">
                                    <FormikCustomInput label="Title" name="title" type="text" />
                                    <FormikCustomInput label="Description" name="description" type="text" />
                                    <FormikCustomInput label="Objectives" name="objectives" type="text" />
                                    <FormikCustomInput label="Price" name="price" type="number" />
                                    <FormikCustomInput label="Duration" name="duration" type="number" />
                                    <FormikCustomInput label="Enrolled Students" name="enrolledStudents" type="number" />
                                    {/* <FormikCustomInput label="Teacher" name="teacher" type="text" /> */}
                                    <FormikCustomInput label="Image URL" name="imageUrl" type="text" />
                                    {/* <div>
                                <p className="block text-sm font-medium text-gray-900 mb-2">Target Audience</p>
                                <div className="flex flex-col md:flex-row gap-5">
                                    {interestsData.map((interest, index) => (
                                        <FormikCheckbox
                                            key={index}
                                            name="targetAudience"
                                            value={interest}
                                            label={interest}
                                        />
                                    ))}
                                </div>
                            </div> */}

                                    <CustomButton
                                        showAnimation={isEditing}
                                        type="submit"
                                        style="btn-primary bg-primary_b_dark py-3 text-white w-fit mx-auto px-6"
                                    >
                                        {isEdit ? "Update Course" : " Create Course"}
                                    </CustomButton>
                                </Form>
                            )}
                        </Formik>}
            </div>
        </div>
    )
};

export default CourseDetailsForm;