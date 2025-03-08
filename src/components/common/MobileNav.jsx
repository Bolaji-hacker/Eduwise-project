import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/ContextExport";
function MobileNav({ isOpen, toggleSidebar, sideBarData, pathname }) {
    const { Logout } = useGlobalContext();
    return (
        <div className="lg:hidden absolute">
            {/* Overlay */}
            <button
                className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleSidebar}
            ></button>

            {/* Drawer */}
            <div
                className={`fixed left-0 top-0 w-64 h-full bg-[#ea6660]  z-50 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 text-xl  font-bold border-b border-r bg-white border-[#f0f0f0]">
                    <a href="/" className="flex gap-1 items-center">
                        <img src="/logo-small.png" alt="logo" />
                        <p className="text-[20px] mt-2 font-semibold">
                            EduWise
                        </p>
                    </a>
                </div>

                <ul className="mt-4 flex flex-col" onClick={toggleSidebar}>
                    {sideBarData?.map(({ id, url, label }) => {
                        return (
                            <Link
                                key={id}
                                to={url}
                                className={`p-4 text-white hover:bg-gray-700 ${pathname === url ? "bg-primary_b" : ""
                                    } `}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <button
                        className={`p-4 w-full text-white bg-red-500 border border-red-500 text-left`}
                        onClick={() => Logout()}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </div>
    );
}

export default MobileNav;
