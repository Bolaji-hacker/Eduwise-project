import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/ContextExport"
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";
import { cn } from "../../lib/utilities";
import CustomButton from "../common/CustomButton";
import QuizResultPanel from "./QuizResultPanel";

const QuizAttemptPanel = () => {
    const { singleQuiz: questions, handleSubmitQuiz, singleCourse, isSubmittingQuiz, quizResult, setRunning, running, setTime } = useGlobalContext()

    useEffect(() => {
        setRunning(true)
    }, [])

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running]);



    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerSelect = (optionId, userAnswer) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = userAnswer;
            return newAnswers;
        });
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // console.log("Student Answers:", { answers });
        // alert("Quiz submitted! Check the console for answers.");
        handleSubmitQuiz(singleCourse?._id, singleCourse?.quizzes?.[0]?._id, answers, (result) => {
            console.log("setQuizResult", result)
        })
    };


    return (
        <>
            {quizResult
                ? (
                    <QuizResultPanel />
                )
                : (
                    <div className="px-4 md:px-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl md:text-2xl font-semibold">{questions?.[currentQuestionIndex]?.questionText}</h3>
                            <p className="flex flex-col items-center gap-">
                                <span className="text-xs uppercase text-gray-500">
                                    Question
                                </span>
                                <span className="text-primary_b_dark italic  text-lg">
                                    {currentQuestionIndex + 1}/{questions.length}
                                </span>
                            </p>

                        </div>

                        <div className="flex flex-col ">

                            {questions[currentQuestionIndex]?.options?.map((option) => (
                                <div key={option._id}>
                                    <label className="flex gap-2 py-2 items-center capitalize cursor-pointer">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={option?._id}
                                            checked={answers[currentQuestionIndex] === option?.optionText}
                                            onChange={() => handleAnswerSelect(option?._id, option?.optionText)}
                                            className="hidden"
                                        />
                                        <span className="text-primary_b_dark text-xl"  >

                                            {answers[currentQuestionIndex] === option?.optionText ? <MdOutlineRadioButtonChecked /> : <MdOutlineRadioButtonUnchecked />}
                                        </span>

                                        <span className="text-sm" >
                                            {option?.optionText}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={cn(
                                    "py-2 px-4 rounded",
                                    {
                                        "bg-gray-500 text-white cursor-not-allowed": currentQuestionIndex === 0,
                                        "bg-blue-500 text-white hover:bg-blue-700": currentQuestionIndex !== 0,
                                    }
                                )}
                            >
                                Previous
                            </button>

                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={nextQuestion}
                                    disabled={answers[currentQuestionIndex] === null}
                                    className={cn(
                                        "py-2 px-4 rounded ml-2",
                                        {
                                            "bg-blue-500 text-white hover:bg-blue-700": answers[currentQuestionIndex] !== null,
                                            "bg-gray-500 text-white cursor-not-allowed opacity-50": answers[currentQuestionIndex] === null,
                                        }
                                    )}
                                >
                                    Next
                                </button>
                            ) : (
                                <CustomButton
                                    onClick={handleSubmit}
                                    showAnimation={isSubmittingQuiz}
                                    style="bg-green-500 w-fit text-white py-2 px-6 rounded ml-2 hover:bg-green-700"
                                >
                                    Submit
                                </CustomButton>
                            )}
                        </div>
                    </div>
                )
            }
        </>

    )

}

export default QuizAttemptPanel
