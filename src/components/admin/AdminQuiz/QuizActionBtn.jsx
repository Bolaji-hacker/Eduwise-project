import { useNavigate } from 'react-router-dom'


const QuizActionBtn = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div>
            {data?.length > 0 ?
                <button
                >
                    Delete Quiz
                </button>
                :
                <button
                    onClick={() => navigate(`create_quizz/${data?._id}`)}
                >
                    Add Quizz
                </button>

            }
        </div>
    )
}

export default QuizActionBtn