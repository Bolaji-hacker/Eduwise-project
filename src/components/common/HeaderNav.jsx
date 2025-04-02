import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuthContext, useGlobalContext } from "../../context/ContextExport";

const HeaderNav = ({ toggleSidebar, isOpen, path = "" }) => {
    const { isLoggedIn } = useAuthContext();
    const { userRole } = useGlobalContext()
    return (
        <div className="z-50 relative">
            <div
                className={`max-h-[4.125rem] px-4 h-full fixed top-0  left-0 w-full bg-white shadow  flex items-center justify-between ${path === "full" ? " " : "lg:left-64"
                    }`}
            >
                <div className={`${path === "full" ? "" : "lg:hidden "}`}>
                    <a href="/" className="flex gap-1 items-center">
                        <img src="/logo-small.png" alt="logo" />
                        <p className="text-[20px] mt-2 font-semibold">
                            EduWise
                        </p>
                    </a>
                </div>

                {/* Hamburger Menu */}
                <div className="flex items-center">
                    <div className="flex gap-5 items-center">
                        {" "}
                        {/* <Link to="/dashboard/admin/upload">
                            Admin Dashboard
                        </Link> */}
                        <Link to={userRole === "lecturer" ? "/admin_dashboard" : "/dashboard"} className="hidden md:inline-block" >Dashboard</Link>
                        <Link to={userRole === "lecturer" ? "admin_my_course" : "/courses"}>All Courses</Link>
                        {isLoggedIn ? "" : <Link to="/login">Login</Link>}
                    </div>

                    {path !== "full" && (
                        <button
                            onClick={toggleSidebar}
                            className="p-4 text-gray-800 focus:outline-none lg:hidden "
                        >
                            {isOpen ? (
                                <HiX className="text-2xl" />
                            ) : (
                                <HiMenuAlt3 className="text-2xl" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderNav;
