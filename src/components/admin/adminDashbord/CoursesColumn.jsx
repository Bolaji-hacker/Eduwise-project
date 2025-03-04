// import { formatDate } from "../../lib/func"

import { Link } from "react-router-dom";



export const CoursesColumn = [

    {
        accessorKey: "name",
        header: "Courses",
        cell: ({ row }) => (
            <div className="text-text_4 w-full ">
                <Link to="" className="max-w-[21.875rem] flex gap-3 items-center " >

                    <img src={row.original.imageUrl} alt="" className="w-16 h-16 object-cover shadow rounded-md" />
                    <p className="text-base">
                        {row.original.title || "nil"}
                    </p>

                </Link>
            </div>
        ),
    },



    {
        accessorKey: "services",
        header: "Enrolled",
        cell: ({ row }) => {

            return (
                <div className="max-w-[300px]" >
                    <p className="text-sm text-text_4">
                        {row.original.enrolledStudents || "nil"}

                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "creator",
        header: "Status",
        cell: ({ row }) => (
            <div>
                <p className="text-sm text-text_4">
                    {" "}
                    {row.original.isActive && "Published"}{" "}
                </p>
                {/* ; `row?.original?.transaction.amount` */}
            </div>
        ),
    },

];