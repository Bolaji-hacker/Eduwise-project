import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton"

const QuizActionBtn = ({ data }) => {
    const navigate = useNavigate()
    const noOfAttempt = data?.[0]?.attempts;
    const courseId = data?._id

    const handleAttepmt = (id) => {
        navigate(`/dashboard/quiz/${id}`)
    }

    return (
        <div>
            <div className="flex gap-3">
                <CustomButton
                    style='btn flex-shrink-0 px-6 bg-primary_b_dark w-fit'
                    // disabled={isPublished}
                    onClick={() => handleAttepmt(courseId)}
                >
                    {noOfAttempt > 0 ? "Retake " : "Attempt"}
                </CustomButton>



            </div>
        </div>
    )
}

export default QuizActionBtn