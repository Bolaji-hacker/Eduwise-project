
import { useLocation } from "react-router-dom";
import CreateQuizForm from "./CreateQuizForm"

const ManageQuiz = () => {
    const { pathname } = useLocation()
    const isEdit = pathname.includes("edit_quiz");
    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem] ">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center ">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    {isEdit ? "Edit" : "Create"} Quizz
                </h3>
            </div>

            <CreateQuizForm isEdit={isEdit} />
        </div>
    )
}

export default ManageQuiz