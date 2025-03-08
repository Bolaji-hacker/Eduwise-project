import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikCustomInput from "../../common/FormikCustomInput";
// import { FormikCheckbox } from "../../common/CustomCheckBox";
import { useGlobalContext } from "../../../context/ContextExport";
import toast from "react-hot-toast";
import CustomButton from "../../common/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const CourseDetailsForm = ({ isEdit }) => {

    const { courseId } = useParams();
    const { getSingleCourseFunc, singleCourse: courseData } = useGlobalContext();
    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        if (courseId) {
            getSingleCourseFunc(courseId)
        }
    }, []);

    useEffect(() => {
        setFormValues(initialValues)
    }, [courseData]);
    console.log("courseData", courseData)

    const navigate = useNavigate();
    const { handleCreateCourse, handleEditCourse } = useGlobalContext();

    const initialValues = {
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
        teacher: Yup.string().required("Teacher is required"),
        // targetAudience: Yup.array().of(Yup.string()).required("Target Audience is required"),
        imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const successFunc = (res) => {
            navigate(`${isEdit ? `/admin_dashboard/edit_lessons/${res?.course?._id}` : `/admin_dashboard/manage_lessons/${res?.course?._id}`}`);
            toast.success(`${isEdit ? "Course Updated Successfully" : "Course Created Successfully"}`);
            setSubmitting(false);
        }
        const payload = {
            // ...courseData,
            ...values,


        }
        
        console.log("payload", payload);
        if(isEdit){
            handleEditCourse(courseData?._id,payload, successFunc)
        }else{

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

    return (
        <div>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
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
                                loading={isSubmitting}
                                type="submit"
                                className="btn-primary bg-primary_b py-3 text-white"
                                disabled={isSubmitting}
                            >
                                {isEdit ? "Update Course" : " Create Course"}
                            </CustomButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

export default CourseDetailsForm;


// [
//     {
//         "sectionNumber": 1,
//         "sectionTitle": "Introduction to Game Ready AI",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 01",
//                 "videoUrl": "https://www.youtube.com/embed/PgxuaTSkyu4?si=Ca68sPZCQak6XfV6",
//                 "duration": 87,
//                 "_id": "6783e01de92850b9ac579f7e"
//             },
//             {
//                 "lessonTitle": "Making Game Ready AI | 02",
//                 "videoUrl": "https://www.youtube.com/embed/cZqIidnnK5A?si=BvS9QsjfqaA5fqbv",
//                 "duration": 80,
//                 "_id": "6783e01de92850b9ac579f7f"
//             }
//         ],
//         "_id": "6783e01de92850b9ac579f7d"
//     },
//     {
//         "sectionNumber": 2,
//         "sectionTitle": "AI Fundamentals",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 03",
//                 "videoUrl": "https://www.youtube.com/embed/KwobTALHGHI?si=SFcKFk9o0Lgj6rIo",
//                 "duration": 151,
//                 "_id": "6783e03ae92850b9ac579f86"
//             },
//             {
//                 "lessonTitle": "Making Game Ready AI | 04",
//                 "videoUrl": "https://www.youtube.com/embed/b6it1NEOsQ8?si=IaikAkdl0oTnCkrJ",
//                 "duration": 55,
//                 "_id": "6783e03ae92850b9ac579f87"
//             }
//         ],
//         "_id": "6783e03ae92850b9ac579f85"
//     },
//     {
//         "sectionNumber": 3,
//         "sectionTitle": "AI in Unreal Engine",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 05",
//                 "videoUrl": "https://www.youtube.com/embed/UGIJ3g7VMho?si=xOX52MneFlSk7FSh",
//                 "duration": 107,
//                 "_id": "6783e057e92850b9ac579f91"
//             },
//             {
//                 "lessonTitle": "Making Game Ready AI | 06",
//                 "videoUrl": "https://www.youtube.com/embed/BbowoQiq2fY?si=A9u3VTbPVIlGo1MS",
//                 "duration": 66,
//                 "_id": "6783e057e92850b9ac579f92"
//             }
//         ],
//         "_id": "6783e057e92850b9ac579f90"
//     },
//     {
//         "sectionNumber": 4,
//         "sectionTitle": "Advanced AI Techniques",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 07",
//                 "videoUrl": "https://www.youtube.com/embed/_cJBlme77QM?si=3Ubu-9xGAZXfmmUq",
//                 "duration": 57,
//                 "_id": "6783e071e92850b9ac579f9f"
//             },
//             {
//                 "lessonTitle": "Making Game Ready AI | 08",
//                 "videoUrl": "https://www.youtube.com/embed/QoygDWmnc08?si=U8gyvWIM3w12jyvo",
//                 "duration": 74,
//                 "_id": "6783e071e92850b9ac579fa0"
//             }
//         ],
//         "_id": "6783e071e92850b9ac579f9e"
//     },
//     {
//         "sectionNumber": 5,
//         "sectionTitle": "Optimization and Debugging",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 09",
//                 "videoUrl": "https://www.youtube.com/embed/EsBAOZ9IF_4?si=EtzzmhNF_CTz9CuW",
//                 "duration": 69,
//                 "_id": "6783e088e92850b9ac579fb0"
//             },
//             {
//                 "lessonTitle": "Making Game Ready AI | 10",
//                 "videoUrl": "https://www.youtube.com/embed/in6usW3aBko?si=KSWAIVaWq4_21Fm5",
//                 "duration": 124,
//                 "_id": "6783e088e92850b9ac579fb1"
//             }
//         ],
//         "_id": "6783e088e92850b9ac579faf"
//     },
//     {
//         "sectionNumber": 6,
//         "sectionTitle": "Final Project and Conclusion",
//         "lessons": [
//             {
//                 "lessonTitle": "Making Game Ready AI | 11",
//                 "videoUrl": "https://www.youtube.com/embed/-tosvDVxSZg?si=HwW7S0_xK1j39GMv",
//                 "duration": 63,
//                 "_id": "6783e09ce92850b9ac579fc4"
//             }
//         ],
//         "_id": "6783e09ce92850b9ac579fc3"
//     }
// ]