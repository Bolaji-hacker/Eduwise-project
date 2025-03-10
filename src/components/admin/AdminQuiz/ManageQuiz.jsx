import CreateQuizForm from "./CreateQuizForm"

const ManageQuiz = () => {
    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem] ">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center ">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Create Quizz
                </h3>
            </div>

            <CreateQuizForm />
        </div>
    )
}

export default ManageQuiz