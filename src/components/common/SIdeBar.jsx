import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import HeaderNav from "./HeaderNav";

import { useGlobalContext } from "../../context/ContextExport";

export default function Sidebar() {
    const { userProfile, getUser, Logout, userRole } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sideBarData = [
        {
            id: 1,
            label: "Dashboard",
            url: "/dashboard",
            path: "/dashboard",
        },
        {
            id: 4,
            label: "Profile",
            url: "profile",
            path: "/dashboard/profile",
        },
        {
            id: 2,
            label: "Enrolled Courses",
            url: "my_course",
            path: "/dashboard/my_course",
        },
        // {
        //     id: 6,
        //     label: "Careers",
        //     // url: "jobs",
        //     url: "jobs",
        //     path: "/dashboard/jobs",
        // },
    ];
    const adminSideBarData = [
        {
            id: 1,
            label: "Dashboard",
            url: "/admin_dashboard",
            path: "/admin_dashboard",
        },
        {
            id: 4,
            label: "Profile",
            url: "admin_profile",
            path: "/dashboard/admin_profile",
        },
        {
            id: 2,
            label: "Courses",
            url: "admin_my_course",
            path: "/dashboard/admin_my_course",
        },
    ];

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="flex h-screen ">
            {/* Sidebar for large screens */}
            <div className="hidden lg:block w-64  fixed h-screen top-0 left-0 bottom-0 border border-[#e9ecef]">
                <div className="px-4 py-3 h-[4rem] text-xl font-bold border-b border-[#e9ecef] bg-white opacity0 ">
                    <a href="/" className="flex gap-1 items-center">
                        <img src="/logo-small.png" alt="logo" />
                        <p className="text-[20px]  font-semibold">AIMatch</p>
                    </a>
                </div>

                <div className="relative border-b border-[#e9ecef] mt-2 ">
                    <div className="bg-[#e74a60] h-[6.1875rem]"></div>
                    {!userProfile?.userImage ? (
                        <p className="absolute shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[7.5rem] h-[7.5rem] rounded-full  object-cover flex items-center  justify-center text-4xl font-bold  bg-[#002058] text-white uppercase ">
                            {userProfile?.fullName?.[0]}
                        </p>
                    ) : (
                        <img
                            src={userProfile?.userImage}
                            alt="user profile"
                            className="absolute shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[7.5rem] h-[7.5rem] rounded-full  object-cover"
                        />
                    )}

                    <div className="bg-white h-[6.2875rem] flex items-center justify-end flex-col">
                        <p className="text-lg text-[#002058] font-semibold">
                            {userProfile?.fullName}
                        </p>
                        <p className="text-sm mt-0">
                            {userProfile?.role === "user" && "Students"}
                            {userProfile?.role === "admin" && "Admin"}
                        </p>
                    </div>
                </div>

                <ul className="mt-4 flex flex-col ">
                    {(userRole === "admin" ? adminSideBarData : sideBarData)?.map(({ id, url, label, path }) => {
                        return (
                            <Link
                                key={id}
                                to={`${url}`}
                                className={`p-4 hover:text-[#e74a60] ${pathname === path ? "text-[#e74a60]" : ""
                                    } `}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </ul>
                <button
                    className={`p-4 w-full text-white bg-red-500 border border-red-500 text-left`}
                    onClick={() => {
                        Logout();
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Drawer for mobile */}
            <MobileNav
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                sideBarData={sideBarData}
                pathname={pathname}
            />

            {/* Main Content */}
            <div className="px-4 w-full lg:ml-64 bg-[#fafafa]">
                <HeaderNav isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <div className="mt-20 pb-10 bg-[#fafafa] max-w-[80rem] 2xl:mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
