import { Link } from "react-router-dom";
import AuthHeader from "../../../components/common/AuthHeader";
import Cookies from "js-cookie";
import { useState } from "react";
// import toast from "react-hot-toast";

import CustomInput from "../../../components/common/CustomInput";
import { loginUser } from "../../../lib/services";
import toast from "react-hot-toast";
import CustomButton from "../../../components/common/CustomButton";

const Login = () => {
    // const navigate = useNavigate();
    // const { signIn } = useAuthContext();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState("");

    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const credentials = {
                email: email,
                password: password,
            };
            const response = await loginUser(credentials);
            toast.success(response.message);
            Cookies.set("authToken", response?.token, { expires: 3 });
            // console.log("res", )
            setTimeout(() => {
                if (response?.user?.role === "lecturer") {
                    window.location.href = "/admin_dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            }, 2000);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthHeader title={"Sign into Your Account "}>
            <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                    <CustomInput
                        label={" Email address"}
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder={"Enter your email"}
                        required
                        autoComplete="email"
                    />
                </div>

                <div>
                    <CustomInput
                        label={"Password"}
                        id="password"
                        name="password"
                        type={"password"}
                        required
                        placeholder={"Enter your password"}
                        autoComplete="current-password"
                        // className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Link
                        to="/forget_password"
                        className="text-sm font-semibold underline text-[#392c7d]"
                    >
                        Forgot Password ?
                    </Link>
                </div>

                <div>
                    <CustomButton
                        type="submit"
                        disabled={loading}
                        style="btn btn_primary "
                        showAnimation={loading}
                    >
                        Sign in
                    </CustomButton>
                </div>

                <div className="mt-5 text-xs text-gray-500 text-center">
                    New User?{" "}
                    <Link
                        to="/register"
                        className="text-xs font-semibold underline text-[#392c7d]"
                    >
                        Create an Account
                    </Link>
                </div>
            </form>
        </AuthHeader>
    );
};

export default Login;
