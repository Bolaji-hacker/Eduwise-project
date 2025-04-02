import { useEffect } from "react"
import { useGlobalContext } from "../../context/ContextExport"


const CreateAdmin = () => {
    const { creatAdminFunc } = useGlobalContext()
    useEffect(() => {
        creatAdminFunc()
    }, [])

    return (
        <div>

        </div>
    )
}

export default CreateAdmin