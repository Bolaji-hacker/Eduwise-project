import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikCustomInput from "../../common/FormikCustomInput";
import { FormikCheckbox } from "../../common/CustomCheckBox";
import { useGlobalContext } from "../../../context/ContextExport";
import toast from "react-hot-toast";
import CustomButton from "../../common/CustomButton";
import { useNavigate } from "react-router-dom";



const CourseDetailsForm = () => {
    const navigate = useNavigate();
    const { handleCreateCourse } = useGlobalContext();

    const initialValues = {
        price: "",
        objectives: "",
        description: "",
        title: "",
        duration: "",
        enrolledStudents: "",
        teacher: "",
        targetAudience: [],
        imageUrl: "",
    };

    const validationSchema = Yup.object({
        price: Yup.number().required("Price is required"),
        objectives: Yup.string().required("Objectives are required"),
        description: Yup.string().required("Description is required"),
        title: Yup.string().required("Title is required"),
        duration: Yup.number().required("Duration is required"),
        enrolledStudents: Yup.number().required("Enrolled Students is required"),
        teacher: Yup.string().required("Teacher is required"),
        targetAudience: Yup.array().of(Yup.string()).required("Target Audience is required"),
        imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const successFunc = (res) => {
            navigate(`/admin_dashboard/manage_lessons/${res?.course?._id}`);
            toast.success("Course Created Successfully");
            setSubmitting(false);
        }

        handleCreateCourse(values, successFunc);
    };

    const interestsData = [
        "Machine Learning",
        "Robotics",
        "Natural Language Processing (NLP)",
        "Cognitive Computing",
        "AI in Gaming",
    ];

    return (
        <div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <FormikCustomInput label="Title" name="title" type="text" />
                            <FormikCustomInput label="Description" name="description" type="text" />
                            <FormikCustomInput label="Objectives" name="objectives" type="text" />
                            <FormikCustomInput label="Price" name="price" type="number" />
                            <FormikCustomInput label="Duration" name="duration" type="number" />
                            <FormikCustomInput label="Enrolled Students" name="enrolledStudents" type="number" />
                            <FormikCustomInput label="Teacher" name="teacher" type="text" />
                            <FormikCustomInput label="Image URL" name="imageUrl" type="text" />
                            <div>
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
                            </div>

                            <CustomButton
                                loading={isSubmitting}
                                type="submit"
                                className="btn-primary bg-primary_b py-3 text-white"
                                disabled={isSubmitting}
                            >
                                Create Course
                            </CustomButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

export default CourseDetailsForm;
