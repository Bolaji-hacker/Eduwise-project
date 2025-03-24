import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import FormikCustomInput from "../../common/FormikCustomInput";
import CustomButton from "../../common/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { cn } from "../../../lib/utilities";
import { useGlobalContext } from "../../../context/ContextExport";
import toast from "react-hot-toast";

const CreateQuizForm = ({ isEdit }) => {
    const navigate = useNavigate();
    const { createQiuzFunc, isEditing, getSingleQuizFunc, singleQuiz, handleEditQuiz } = useGlobalContext()
    const { courseId, quizId } = useParams();
    const [openIndex, setOpenIndex] = useState(1);

    useEffect(() => {
        getSingleQuizFunc(courseId)
    }, [])

    const initialValues = {
        quizzes: singleQuiz || [{ questionText: "", options: [{ optionText: "", isCorrect: false }] }],
    };

    // console.log("singleQuiz", singleQuiz)




    const validationSchema = Yup.object({
        quizzes: Yup.array().of(
            Yup.object({
                questionText: Yup.string().required("Question is required"),
                options: Yup.array()
                    .of(
                        Yup.object({
                            optionText: Yup.string().required("Option text is required"),
                            isCorrect: Yup.boolean(),
                        })
                    )
                    .min(2, "At least two options are required")
                // .test("at-least-one-correct", "At least one option must be correct", (options) => {
                //     const isValid = options.some((option) => option.isCorrect);
                //     if (!isValid) toast.error("One of the Options must be correct", options);
                //     return isValid;
                // }),
            })
        ),
    });


    const handleSubmit = async (values) => {
        const successFunc = () => {
            // navigate("/admin_dashboard/admin_quiz")
            // toast.success("Quiz Added Succefully!")
        }
        if (isEdit) {
            handleEditQuiz(courseId, quizId, values)
        } else {
            createQiuzFunc(courseId, values, successFunc)
        }
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className="space-y-6">
                        <FieldArray name="quizzes">
                            {({ push, remove }) => (
                                <div>
                                    {values.quizzes?.map((quiz, index) => (
                                        <div key={index} className="border p-4 mb-4 ">
                                            {/* Title and dropdown button  */}
                                            <div className="cursor-pointer bg-[#f3f3f3] p-4 flex items-center justify-between " onClick={() => setOpenIndex(openIndex === index ? null : index)}>

                                                <div className="flex items-center gap-3">
                                                    <IoChevronForwardOutline className={cn("transition-all duration-300", openIndex === index && "rotate-90")} />
                                                    <h3>Question {index + 1}: {quiz.questionText || "New Question"}</h3>
                                                </div>

                                                <button type="button" className="btn bg-red-500 w-fit" onClick={() => remove(index)}>
                                                    Remove Question
                                                </button>
                                            </div>

                                            {/* Dropworn of  questio and option */}
                                            {openIndex === index && (
                                                <div className="mt-2">
                                                    <FormikCustomInput
                                                        label={`Question ${index + 1}`}
                                                        name={`quizzes.${index}.questionText`}
                                                        type="text"
                                                    />
                                                    <FieldArray name={`quizzes.${index}.options`}>
                                                        {({ push: pushOption, remove: removeOption }) => (
                                                            <div>
                                                                {quiz.options.map((option, optIndex) => (
                                                                    <div key={optIndex} className=" gap-2 mt-2">
                                                                        <div className="flex items-center justify-between md:max-w-[233px]">
                                                                            <label className="label mb-1 text-sm"> {`Option ${optIndex + 1}`} </label>

                                                                            <div className="text-primary_b_dark text-sm flex items-center gap-1 ">
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name={`quizzes.${index}.options.${optIndex}.isCorrect`}
                                                                                />
                                                                                <span>Answer</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                                                            <FormikCustomInput
                                                                                name={`quizzes.${index}.options.${optIndex}.optionText`}
                                                                                type="text"
                                                                            />



                                                                            <button type="button" className="w-fit text-red-500" onClick={() => removeOption(optIndex)}>
                                                                                Remove option
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                {/* <ErrorMessage  name={`quizzes.${index}.options`} component="div" className="text-red-500" /> */}

                                                                <button type="button" onClick={() => pushOption({ optionText: "", isCorrect: false })} className="mt-4 text-primary_b_dark w-fit" >
                                                                    Add Option
                                                                </button>
                                                            </div>
                                                        )}
                                                    </FieldArray>

                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="px-4">
                                        <button type="button" onClick={() => push({ questionText: "", options: [{ optionText: "", isCorrect: false }] })}
                                            className="btn bg-primary_b_dark w-fit"
                                        >
                                            Add Question
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>

                        <div className="flex justify-center pb-5">

                            <CustomButton
                                showAnimation={isEditing}
                                type="submit"
                                style="btn bg-primary_b  py-3 w-fit mx-auto px-6 text-white"
                                disabled={values.quizzes?.length < 1 || isEditing}
                            >
                                {isEdit ? "Update Quiz" : "Create Quiz"}
                            </CustomButton>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateQuizForm;