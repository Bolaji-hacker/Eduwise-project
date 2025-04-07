import { useEffect } from "react"
import LecturersPanel from "../../components/superAdmin/LecturersPanel"
import { useGlobalContext } from "../../context/ContextExport"
import AddAdminModal from "../../components/superAdmin/AddAdminModal"

const Lecturers = () => {
    const { getUsersFunc } = useGlobalContext()
    useEffect(() => {
        getUsersFunc()
    }, [])

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex itesm-center justify-between">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Manage Admins
                </h3>
                {/* <button>Create admin</button> */}
                <AddAdminModal />
            </div>

            <LecturersPanel />

        </div>
    )
}

export default Lecturers