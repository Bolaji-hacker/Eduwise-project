import { useGlobalContext } from "../../context/ContextExport"
import CustomTable from "../common/CustomTable"
import { lecturerColumn } from "./LecturerColumn"

const LecturersPanel = () => {
    const { lecturers, admins, students, fetchingUsers } = useGlobalContext()
    console.log('====================================');
    console.log(lecturers);
    console.log('====================================');
    return (
        <div>
            <CustomTable
                isPaginated={false}
                data={lecturers}
                columns={lecturerColumn}
                showAnimation={fetchingUsers}
            />
        </div>
    )
}

export default LecturersPanel