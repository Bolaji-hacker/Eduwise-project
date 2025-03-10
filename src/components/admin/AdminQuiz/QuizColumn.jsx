
import QuizActionBtn from "./QuizActionBtn";



export const QuizColumn = [

    {
        accessorKey: "name",
        header: "Quizzes",
        cell: ({ row }) => (
            <div className="text-text_4 w-full ">
                <div className="max-w-[21.875rem] flex gap-3 items-center " >

                    <img src={row.original.imageUrl} alt="" className="w-16 h-16 object-cover shadow rounded-md" />
                    <p className="text-base">
                        {row.original.title || "nil"}
                    </p>

                </div>
            </div>
        ),
    },



    {
        accessorKey: "services",
        header: "No. of Participant",
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
    {
        accessorKey: "quizzes",
        header: "Action",
        cell: ({ row }) => (
            <div>
                <QuizActionBtn data={row.original} />
            </div>
        ),
    },

];