import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex h-screen md:overflow-hidden">
            {/* Left Side (Fixed) */}
            <div
                className="w-1/2 hidden sm:flex flex-col items-center justify-center bg-cover bg-center "
                style={{ backgroundImage: "url(/authImgBg.png)" }}
            >
                <div className="text-center px-8">
                    <img
                        src="/authImg.png" // Replace with your illustration/image URL
                        alt="Welcome Illustration"
                        className="w-2/3 mx-auto mb-6"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome to AIMATCH Courses.
                    </h1>
                    <p className="text-[#22100d] text-sm  mt-4 max-w-[35.625rem]">
                        Where we empower educators and institutions to create
                        stunning, effective online learning experiences. We also
                        combine innovation, flexibility, and ease of use to help
                        you build a school that stands out.
                    </p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 px-4 overflow-y-auto">
                <div className="mt-10 md:pt-[4.375rem] sm:mx-auto sm:w-full xl:px-[6.25rem]">
                    <div className="flex items-center justify-between mb-5">
                        <a href="/" className="flex gap-1 items-center">
                            <img src="/logo-small.png" alt="logo" />
                            <p className="text-[20px]  font-semibold">
                                AIMatch
                            </p>
                        </a>
                        <Link
                            to="/courses"
                            className="text-[#b9b7c0] text-sm underline"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
