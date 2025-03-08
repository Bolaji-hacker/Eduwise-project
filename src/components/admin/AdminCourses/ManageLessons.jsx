import CreateCourseLayout from "../../../Layout/CreateCourseLayout";
import { useEffect, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import FormikCustomInput from '../../common/FormikCustomInput';
import { IoChevronDown } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import PreLoader from "../../common/PreLoader";
import { useGlobalContext } from "../../../context/ContextExport";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ManageLessons = () => {
    const { pathname } = useLocation();
    const { courseId } = useParams()
    const isEdit = pathname.includes("edit_lessons");
    const { handleAddCourseLessons, getSingleCourseFunc, singleCourse , editCourseLessons, isEditLessons} = useGlobalContext()
    const [formValues, setFormValues] = useState([]);
    // console.log("singleCourse", singleCourse);

    useEffect(() => {
        if (courseId) {
            getSingleCourseFunc(courseId)
        }
    }, []);

    useEffect(() => {
        setFormValues(initialValues)
    }, [singleCourse]);




    const [collapsedSections, setCollapsedSections] = useState([]);

    const toggleSectionCollapse = (index) => {
        setCollapsedSections(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const initialValues = {
        sections: singleCourse?.contents?.length > 0 ? singleCourse?.contents  :  [{
            sectionTitle: singleCourse?.sectionTitle || '',
            releaseDate: singleCourse?.releaseDate || new Date(),
            sectionNumber: singleCourse?.sectionNumber || '',
            lessons: singleCourse?.lessons || [{ lessonTitle: '', videoUrl: '', documentUrl: '', duration: '' }],
        }],
    };

    const validationSchema = Yup.object({
        sections: Yup.array().of(
            Yup.object({
                sectionTitle: Yup.string().required('Section Title is required'),
                // releaseDate: Yup.date().required('Release Date is required'),
                lessons: Yup.array().of(
                    Yup.object({
                        lessonTitle: Yup.string().required('Lesson Title is required'),
                        videoUrl: Yup.string().url('Invalid URL').required('Video URL is required'),
                        duration: Yup.number().required('Duration is required').positive('Duration must be positive'),
                    })
                ),
            })
        ),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = values.sections.map(section => ({
            sectionTitle: section.sectionTitle,
            releaseDate: section.releaseDate,
            // sectionId: section?._id,
            lessons: section.lessons.map(lesson => ({
                lessonTitle: lesson.lessonTitle,
                videoUrl: lesson.videoUrl,
                documentUrl:"",
                duration: parseInt(lesson.duration, 10),
            })),
        }));

        // console.log("values", values)

        const successFunc = (res) => {
            setSubmitting(false)
            toast.success(res?.message);
            resetForm()
        }
        const  editpayload = {
            contents: values?.sections
        }

        if(isEdit){
            editCourseLessons(courseId, editpayload, successFunc)
        }else   {

            handleAddCourseLessons(courseId, payload, successFunc)
        }

    };

    return (
        <CreateCourseLayout currentStep={2} noOfSteps={2} title={isEdit ? "Edit Course/ Lessons" : "Create Course/ Lessons"} className="">
            <div className="py-5 ">
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, isValid }) => (
                        <Form>
                            <FieldArray name="sections">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-4 ">
                                        {values.sections?.map((section, sectionIndex) => (
                                            <div key={sectionIndex} className=" px-4  bg-gray_1">

                                                <div onClick={() => toggleSectionCollapse(sectionIndex)} className="cursor-pointer py-4 flex items-center justify-between">
                                                    <span className="">
                                                        {`Section ${sectionIndex + 1}${`: ${section.sectionTitle}`}`}
                                                    </span>

                                                    <button>
                                                        <IoChevronDown />
                                                    </button>
                                                </div>

                                                {!collapsedSections[sectionIndex] && (
                                                    <>
                                                        <FormikCustomInput label="Section Title" name={`sections[${sectionIndex}].sectionTitle`} type="text" />

                                                        <div className=" rounded-md">
                                                            <FieldArray name={`sections[${sectionIndex}].lessons`}  >
                                                                {({ push: pushLesson, remove: removeLesson }) => (
                                                                    <div className="">
                                                                        {section.lessons.map((lesson, lessonIndex) => (
                                                                            <div key={lessonIndex} className="bg-white mt-4 p-4">
                                                                                <FormikCustomInput label="Lesson Title" name={`sections[${sectionIndex}].lessons[${lessonIndex}].lessonTitle`} type="text" />
                                                                                <FormikCustomInput label="Video URL" name={`sections[${sectionIndex}].lessons[${lessonIndex}].videoUrl`} type="text" />
                                                                                <FormikCustomInput label="Duration (minutes)" name={`sections[${sectionIndex}].lessons[${lessonIndex}].duration`} type="number" />

                                                                                <div className="flex items-center justify-between  mt-4" >
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => removeLesson(lessonIndex)}
                                                                                        className="btn bg-red-500 text-white w-fit text-sm"
                                                                                    >Remove Lesson</button>

                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => isValid && pushLesson({ lessonTitle: '', videoUrl: '', duration: '' })}
                                                                                        disabled={!isValid}
                                                                                        className="btn bg-primary_b_dark w-fit"

                                                                                    >Add Lesson</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                        <div className="flex items-center justify-end pb-4" >

                                                                            <button
                                                                                type="button"
                                                                                onClick={() => remove(sectionIndex)}
                                                                                className="btn_primary py-2 px-4 mt-4 text-sm bg-red-500 text-white rounded-md hover:bg-red-900"
                                                                            >
                                                                                Remove Section
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </FieldArray>


                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button"

                                            onClick={() => isValid && push({ sectionTitle: '', releaseDate: '', lessons: [{ lessonTitle: '', videoUrl: '', duration: '' }] })}
                                            disabled={!isValid}
                                            className="btn bg-primary_b_dark w-fit  flex items-center gap-2 "
                                        >


                                            <FaPlus />  Add Section</button>
                                    </div>
                                )}
                            </FieldArray>
                            <button
                                type="submit"
                                className="btn bg-primary_b text-white mt-4 w-fit mx-auto px-10 "
                                disabled={isEditLessons || isSubmitting}>
                                {(isEditLessons || isSubmitting) ? <PreLoader /> : 'Submit'}

                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </CreateCourseLayout>
    );
};

export default ManageLessons;
