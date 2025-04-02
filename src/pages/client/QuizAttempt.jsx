import { useEffect } from "react"

import { useGlobalContext } from "../../context/ContextExport"
import { useParams } from "react-router-dom"
import PreLoader from "../../components/common/PreLoader"
import QuizAttemptPanel from "../../components/quiz/QuizAttemptPanel"

const QuizAttempt = () => {
    const { courseId } = useParams()
    const { getSingleQuizFunc, fetchingSingleQuiz, singleCourse } = useGlobalContext()
    useEffect(() => {
        getSingleQuizFunc(courseId)
    }, [])



    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center justify-between gap-3">
                <h3 className=" text-[#002058] md:text-lg font-semibold">
                    {/* {singleQuiz} */}
                    Quiz -   {singleCourse?.title}
                </h3>
                {/* <h2 className="text-xl italic font-semibold flex-shrink-0 ">{currentQuestionIndex + 1} / {singleQuiz?.length}</h2> */}
            </div>
            <div className=" py-6 ">
                {fetchingSingleQuiz ? (
                    <div className="isCentered min-h-[30vh]">
                        <PreLoader />
                    </div>
                ) : (
                    <QuizAttemptPanel />
                )}
            </div>
        </div >
    );
}

export default QuizAttempt