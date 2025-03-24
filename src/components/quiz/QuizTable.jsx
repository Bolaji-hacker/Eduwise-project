import CustomTable from '../common/CustomTable'
import { useGlobalContext } from '../../context/ContextExport'
import { QuizColumn } from './QuizColumn'

const QuizTable = () => {
    const { clientQuiz, fetchingAllQuiz } = useGlobalContext()
    return (
        <div>
            <CustomTable
                isPaginated={false}
                data={clientQuiz}
                columns={QuizColumn}
                showAnimation={fetchingAllQuiz}
            />
        </div>
    )
}

export default QuizTable