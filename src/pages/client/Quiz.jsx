import { useEffect } from "react";
import { useGlobalContext } from "../../context/ContextExport";
import QuizTable from "../../components/quiz/QuizTable";

const Quiz = () => {
    const { getQuiz } = useGlobalContext()

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem] ">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center ">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Available Quiz
                </h3>
                {/* <SearchInput /> */}
            </div>
            <div className="px-4 py-6 min-h-[70vh]">
                <QuizTable />
            </div>
        </div>
    )
}

export default Quiz