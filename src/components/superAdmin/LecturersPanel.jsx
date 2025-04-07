import { useGlobalContext } from "../../context/ContextExport"
import CustomTable from "../common/CustomTable"
import { lecturerColumn } from "./LecturerColumn"

const LecturersPanel = () => {
    const { admins, fetchingUsers } = useGlobalContext()
    return (
        <div className="px-4" >
            <CustomTable
                isPaginated={false}
                data={admins}
                columns={lecturerColumn}
                showAnimation={fetchingUsers}
            />
        </div>
    )
}

export default LecturersPanel