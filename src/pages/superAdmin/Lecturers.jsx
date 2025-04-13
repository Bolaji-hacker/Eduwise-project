import { useEffect } from "react"
import LecturersPanel from "../../components/superAdmin/LecturersPanel"
import { useGlobalContext } from "../../context/ContextExport"
import AddAdminModal from "../../components/superAdmin/AddAdminModal"
import { useLocation } from "react-router-dom"
import AddLecturersModal from "../../components/superAdmin/AddLecturersModal"

const Lecturers = () => {
    const { getUsersFunc } = useGlobalContext()
    const { pathname } = useLocation()
    const isLecturers = pathname.includes("manage_lecturers")

    console.log(isLecturers);

    useEffect(() => {
        getUsersFunc()
    }, [])

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex itesm-center justify-between">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    {isLecturers ? " Manage Lecturers" : " Manage Admins"}
                </h3>
                {/* <button>Create admin</button> */}

                {isLecturers ? <AddLecturersModal />
                    :
                    <AddAdminModal />}
            </div>

            <LecturersPanel isLecturers={isLecturers} />

        </div>
    )
}

export default Lecturers