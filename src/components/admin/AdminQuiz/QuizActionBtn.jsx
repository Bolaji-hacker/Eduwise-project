import { useNavigate } from 'react-router-dom'
import CustomButton from '../../common/CustomButton'
import { useGlobalContext } from '../../../context/ContextExport.js'
import { useState } from 'react'


const QuizActionBtn = ({ data }) => {
    const navigate = useNavigate()
    const [quizId, setQuizId] = useState("")
    const { isDeletingQuiz, deleteQuizFunc, isPublishingQuiz, publishQuizFunc } = useGlobalContext()

    const quizData = data?.quizzes;
    const isQuizAvailable = quizData?.length > 0;
    const isPublished = quizData?.[0]?.published;
    const quizDataId = data?.quizzes?.[0]?._id

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete the quizz?.")) {
            setQuizId(quizDataId)
            deleteQuizFunc(data?._id, quizDataId)

        }

    }
    const handlePublish = () => {

        if (confirm("Published quiz cannot be edited.")) {
            setQuizId(quizDataId)
            publishQuizFunc(data?._id, quizDataId)

        }

    }
    const handleEditQuiz = () => {
        navigate(`/admin_dashboard/admin_quiz/edit_quiz/${data?._id}/${quizDataId}`)
    }

    return (
        <div>
            {isQuizAvailable ?
                <div className="flex gap-3">
                    <CustomButton
                        style='btn flex-shrink-0 bg-red-600 w-fit'
                        disabled={isPublished}
                        showAnimation={isDeletingQuiz && quizId === quizDataId}
                        onClick={handleDelete}
                    >
                        Delete Quiz
                    </CustomButton>

                    <CustomButton
                        style='btn flex-shrink-0 bg-primary_b_dark w-fit'
                        disabled={isPublished}
                        onClick={handleEditQuiz}
                    >
                        Edit Quiz
                    </CustomButton>

                    <CustomButton
                        style='btn flex-shrink-0 bg-green-500 w-fit'
                        disabled={isPublished}
                        showAnimation={isPublishingQuiz && quizId === quizDataId}
                        onClick={handlePublish}
                    >
                        Publish
                    </CustomButton>
                </div>
                :
                <CustomButton
                    style='btn bg-primary_b w-fit'

                    onClick={() => navigate(`create_quizz/${data?._id}`)}
                >
                    Add Quizz
                </CustomButton>

            }
        </div>
    )
}

export default QuizActionBtn