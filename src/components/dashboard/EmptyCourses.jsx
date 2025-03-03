import { Link } from "react-router-dom";

export function EmptyCourses({ text, btn = true, btnText }) {
    return (
        <div className="min-h-[18.75rem] w-full flex items-center justify-center">
            <div className=" text-center">
                <h2 className=" text-[#685f78] capitalize ">
                    {text || "You have not enrolled for any course yet"}
                </h2>
                {btn && (
                    <Link to="/courses">
                        <button className="mt-3 border px-3 py-2  rounded-md border-[#002058]  ">
                            {btnText || "Explore Courses"}
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
