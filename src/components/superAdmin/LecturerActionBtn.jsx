// import React from 'react'

import { useState } from "react";
import { useGlobalContext } from "../../context/ContextExport"
import CustomButton from "../common/CustomButton"

const LecturerActionBtn = ({ data }) => {
    const [currentId, setCurrentId] = useState("")
    const { manageAdminFunc, managingAdmin } = useGlobalContext();

    return (
        <div>

            <CustomButton
                style={`btn flex-shrink-0 max-w-[128px] ${data?.isActive ? "bg-red-600" : "bg-green-500"}`}
                // disabled={isPublished}
                showAnimation={managingAdmin && currentId === data?._id}
                onClick={() => {
                    setCurrentId(data?._id)
                    manageAdminFunc(data?._id)
                }}
            >

                {data?.isActive ? "Deactivate" : "Activate"}

            </CustomButton>

        </div>
    )
}

export default LecturerActionBtn