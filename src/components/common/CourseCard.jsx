import { FaCalendarWeek, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useGlobalContext } from "../../context/ContextExport";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { specialAccessRoles } from "../../lib/utilities";

export function CourseCard({ item, path, enrolFunc, isEnrolled }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthContext();
    const [deleteId, setDeleteId] = useState("");

    const { enrolling, userRole, deleteCourseFunc, isDeletingcourse } = useGlobalContext();

    const enrollUser = () => {
        if (isLoggedIn) {
            enrolFunc();
        } else {
            localStorage.setItem("courseId", item?._id);
            navigate("/login");
        }
    };
    const { lecturer, title, duration, enrolledStudents, imageUrl } = item;
    return (
        <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">
                <div className="relative h-full md:min-h-[220px]">
                    <img
                        className="w-full z-10 max-h-[13.75rem] min-h-[220px] object-cover"
                        src={imageUrl}
                        alt={title}
                    />
                    {/* <div className="absolute bottom-0 right-0 py-[0.3125rem] text-white font-semibold text-base sm:text-lg px-[1.5625rem] bg-[#092ace]">
                        Free
                    </div> */}
                </div>
                <div className="px-4 sm:px-4 py-6 bg-white">
                    {/* Title */}
                    <div className="font-semibold text-lg capitalize truncate ">
                        {title}
                    </div>
                    {/* teacher */}
                    {!specialAccessRoles.includes(userRole) && <div className=" text-base">
                        <p className="pt-2 pb-[0.625rem] text-[0.9375rem] text-[#6A7A83]">
                            Teacher -{" "}
                            <span className="text-[#092ace] font-semibold">
                                {lecturer?.fullName}
                            </span>{" "}
                        </p>
                    </div>}
                    {/* course info */}
                    <div className="pt-[0.9375rem] flex items-center justify-between gap-0">
                        {!specialAccessRoles.includes(userRole) && <div className="flex  flex-col gap-2 text-[#6A7A83] w-ful">
                            <div className="flex items-center gap-[0.625rem]">
                                <FaCalendarWeek />{" "}
                                <p className="text-sm">{duration} Days</p>
                            </div>
                            <div className="flex m items-center gap-[0.625rem]">
                                <FaUser />{" "}
                                <p className="text-sm">
                                    {enrolledStudents} Students
                                </p>
                            </div>
                        </div>}
                        {userRole === "lecturer" || userRole === "admin" || userRole === "super_admin" ?
                            (<div className="flex items-center w-full justify-between">
                                <Link
                                    to={`/admin_dashboard/edit_courses/${item?._id}`}
                                    className="block"
                                >
                                    <button className="py-2 text-sm text-white  bg-[#092ace] w-fit px-5">
                                        Edit
                                    </button>
                                </Link>

                                <CustomButton
                                    style="py-2 text-sm text-white rounded-none  px-3 bg-red-700 hover:bg-red-900  w-fit flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50 "
                                    onClick={() => {
                                        setDeleteId(item?._id)
                                        deleteCourseFunc(item?._id)
                                    }}
                                    disabled={isDeletingcourse && deleteId === item?._id}
                                    showAnimation={isDeletingcourse && deleteId === item?._id}
                                >
                                    Delete
                                </CustomButton>

                            </div>)
                            :
                            (<div className="flex items-center w-ful">
                                {path === "courses" ? (
                                    <>
                                        {isEnrolled ? (
                                            <Link
                                                to={`/dashboard/my_course/${item?._id}`}
                                            >
                                                <button className="py-2 text-sm text-white  px-3 bg-[#FF5A2C] hover:bg-[#092ace]  w-full">
                                                    Continue
                                                </button>
                                            </Link>
                                        ) : (
                                            <button
                                                className="py-2 text-sm text-white  px-3 bg-[#FF5A2C] hover:bg-[#092ace]  w-full flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50 "
                                                onClick={enrollUser}
                                                disabled={enrolling}
                                            >
                                                Enroll Now
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <Link to={`/dashboard/my_course/${item?._id}`}>
                                        <button className="py-2 text-sm text-white  px-3 bg-[#FF5A2C] hover:bg-[#092ace]  w-full">
                                            Continue
                                        </button>
                                    </Link>
                                )}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
