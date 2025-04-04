import { LuCircleCheckBig } from "react-icons/lu"
import CustomButton from "../common/CustomButton"
import { useGlobalContext } from "../../context/ContextExport"
import QuizTimer from "./QuizTimer"
import { useEffect } from "react"

const QuizResultPanel = () => {
    const { quizResult, singleQuiz, setRunning, } = useGlobalContext()
    useEffect(() => {
        setRunning(false)
    }, [])
    return (
        <div className="min-h-[50vh] flex items-center justify-center w-full py-10">
            <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-semibold  text-center" >Result</h2>
                <p className="isCentered mt-5" >
                    <LuCircleCheckBig className="text-[#002058] text-[15vw] md:text-[5vw] " />
                </p>
                <p className="text-xl mt-2 text-[#002058] text-center ">
                    Quiz Completed.
                </p>
                <p className="text-center mt-4 text-gray-600">
                    Your Score: <b className="text-[#002058]">{quizResult?.score}</b>
                </p>

                <div className="px-2">
                    <div className="border grid grid-cols-2 py-4 w-full mt-8  max-w-xl mx-auto">
                        <div className="border-r px-4 text-center">
                            <p className="text-sm text-gray-600 mb-1">
                                Total Questions
                            </p>
                            <p>
                                {singleQuiz?.length}
                            </p>

                        </div>
                        <div className="border-r px-4 text-center">
                            <p className="text-sm text-gray-600 mb-1">
                                Time Spent
                            </p>
                            <p>
                                {/* 00 : 00 : 60 */}
                                <QuizTimer />

                            </p>
                        </div>
                    </div>

                </div>

                <div className="isCentered mt-8">
                    <CustomButton
                        onClick={() => {
                            window.location.reload()
                            // tryAgainFunc()
                        }}
                        // showAnimation={isSubmittingQuiz}
                        style="bg-primary_b  w-fit text-white py-2 px-6 rounded ml-2 hover:bg-green-700"
                    >
                        Try Again
                    </CustomButton>
                    <CustomButton
                        onClick={() => {
                            window.location.href = "/dashboard/quiz"
                            // tryAgainFunc()
                        }}
                        // showAnimation={isSubmittingQuiz}
                        style="  w-fit text-white py-2 px-6 rounded ml-2 bg-green-700"
                    >
                        Back to quiz
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default QuizResultPanel