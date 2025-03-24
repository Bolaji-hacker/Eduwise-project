import { useState } from "react";
import { useGlobalContext } from "../../context/ContextExport"

const QuizAttemptPanel = () => {
    const { singleQuiz: questions, handleSubmitQuiz, singleCourse } = useGlobalContext()
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
        handleSubmitQuiz(singleCourse?._id, singleCourse?.quizzes?.[0]?._id, answers)
    };


    return (


        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h2>Quiz</h2>
            <p>
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <h3>{questions?.[currentQuestionIndex]?.questionText}</h3>

            {questions[currentQuestionIndex]?.options?.map((option) => (
                <div key={option._id}>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value={option?._id}
                            checked={answers[currentQuestionIndex] === option?.optionText}
                            onChange={() => handleAnswerSelect(option?._id, option?.optionText)}
                        />

                        {option?.optionText}</label>
                </div>
            ))}

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        marginRight: "10px",
                        backgroundColor: currentQuestionIndex === 0 ? "gray" : "blue",
                        color: "white",
                        padding: "10px"
                    }}
                >
                    Previous
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={nextQuestion}
                        disabled={answers[currentQuestionIndex] === null}
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                            padding: "10px",
                            cursor: answers[currentQuestionIndex] === null ? 'not-allowed' : 'pointer',
                            opacity: answers[currentQuestionIndex] === null ? 0.5 : 1,
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "10px"
                        }}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>

    )

}

export default QuizAttemptPanel
