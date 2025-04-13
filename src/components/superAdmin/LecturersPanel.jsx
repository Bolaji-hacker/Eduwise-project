import { useGlobalContext } from "../../context/ContextExport"
import CustomTable from "../common/CustomTable"
import { lecturerColumn } from "./LecturerColumn"

const LecturersPanel = ({ isLecturers }) => {
    const { admins, fetchingUsers, lecturers } = useGlobalContext()
    return (
        <div className="px-4" >
            <CustomTable
                isPaginated={false}
                data={isLecturers ? lecturers : admins}
                columns={lecturerColumn}
                showAnimation={fetchingUsers}
            />
        </div>
    )
}

export default LecturersPanel