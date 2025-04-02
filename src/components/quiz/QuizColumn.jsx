import { Link } from "react-router-dom";
import QuizActionBtn from "./QuizActionBtn";
import { cn } from "../../lib/utilities";



export const QuizColumn = [

    {
        accessorKey: "name",
        header: "Courses",
        cell: ({ row }) => (
            <div className="text-text_4 ">
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
        accessorKey: "quizzez",
        header: "Questions",
        cell: ({ row }) => {

            return (
                <div className="" >
                    <p className="text-sm text-text_4">
                        {row.original.quizzes?.[0]?.questions?.length || "nil"}

                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "services",
        header: "Total Marks",
        cell: ({ row }) => {

            return (
                <div className="" >
                    <p className="text-sm text-text_4">
                        {row.original.quizzes?.length * 10 || "nil"}%
                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "progress",
        header: "Earned Marks",
        cell: ({ row }) => {
            const data = row.original.quizzes;
            const lastScore = data?.[0]?.totalScore;
            const noOfAttempt = data?.[0]?.attempts;

            let color;
            if (lastScore >= 90) {
                color = "text-green-600"; // Excellent (A)
            } else if (lastScore >= 80) {
                color = "text-blue-600"; // Good (B)
            } else if (lastScore >= 70) {
                color = "text-yellow-600"; // Fair (C)
            } else if (lastScore >= 60) {
                color = "text-orange-600"; // Pass (D)
            } else {
                color = "text-red-600"; // Fail (F)
            }

            return (
                <div className="" >
                    <p className={cn("text-sm text-text_4", data?.[0]?.attempts > 0 && color)}>
                        {noOfAttempt > 0 ? data?.[0]?.totalScore : 'Nil'}
                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "progress",
        header: "Result",
        cell: ({ row }) => {
            const data = row.original.quizzes
            const lastScore = data?.[0]?.totalScore;
            const noOfAttempt = data?.[0]?.attempts
            // const lastScore = 50
            let grade;
            let color;

            if (lastScore >= 90) {
                grade = "Distinction";
                color = "bg-green-200 text-green-800";
            } else if (lastScore >= 60) {
                grade = "Pass";
                color = "bg-blue-200 text-blue-800";
            } else if (lastScore >= 50) {
                grade = "Average";
                color = "bg-purple-200 text-purple-800";
            }
            else {
                grade = "Fail";
                color = "bg-red-200 text-red-800";
            }

            return (
                <div className="" >
                    {noOfAttempt > 0 ? (
                        <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10", color)}>
                            {grade}
                        </span>
                    ) : (
                        'Nil'
                    )}

                </div>
            )
        },
    },
    {
        accessorKey: "attempts",
        header: "No. Of Attempts",
        cell: ({ row }) => {
            const data = row.original.quizzes
            const noOfAttempt = data?.[0]?.attempts


            return (
                <div className="" >
                    {noOfAttempt}

                </div>
            )
        },
    },
    {
        accessorKey: "creator",
        header: "Action",
        cell: ({ row }) => (
            <QuizActionBtn data={row.original} />
        ),
    },

];