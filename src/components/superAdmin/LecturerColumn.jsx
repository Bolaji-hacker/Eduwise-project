import { cn } from "../../lib/utilities";
import LecturerActionBtn from "./LecturerActionBtn";



export const lecturerColumn = [
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
            const userProfile = row.original;
            return (
                <div className="text-text_4 ">
                    {userProfile.userImage ? (
                        <p className=" shadow-md rounded-full  object-cover flex items-center  justify-center text-4xl font-bold  bg-[#002058] text-white uppercase w-20 h-20">
                            {userProfile?.fullName?.[0]}
                        </p>
                    ) : (
                        <img
                            src={userProfile?.userImage}
                            alt="user profile"
                            className=" w-20 h-20 rounded-full object-cover shadow  "
                        />
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => {

            return (
                <div className="" >
                    <p className="text-sm text-text_4">
                        {row.original.fullName || "nil"}

                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "email",
        header: "email",
        cell: ({ row }) => {

            return (
                <div className="" >
                    <p className="text-sm text-text_4">
                        {row.original.email || "nil"}
                    </p>

                </div>
            )
        },
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            return (
                <div className="" >
                    <p className={cn("text-sm text-text_4", row.original.isActive ? "text-green-500" : "text-red-500")}>
                        {row.original.isActive ? "Active" : "Inactive"}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: "creator",
        header: "Action",
        cell: ({ row }) => (
            <LecturerActionBtn data={row.original} />
        ),
    },
];