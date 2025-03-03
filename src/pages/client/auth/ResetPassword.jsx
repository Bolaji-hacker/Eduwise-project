import AuthHeader from "../../../components/common/AuthHeader";

import { useState } from "react";
// import toast from "react-hot-toast";

import CustomInput from "../../../components/common/CustomInput";
import { resetPassword } from "../../../lib/services";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");
    console.log("token", token);
    const navigate = useNavigate();
    // const { signIn } = useAuthContext();

    const [loading, setLoading] = useState("");

    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const handleReSet = async (e) => {
        e.preventDefault();
        if (password === cpassword) {
            setLoading(true);
            try {
                const credentials = {
                    password: password,
                };
                const response = await resetPassword(token, credentials);
                toast.success(response.message);
                navigate("/login");
            } catch (error) {
                toast.error(error?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("Confirm password must be the same as the password.");
        }
    };
    return (
        <AuthHeader title={"Reset your Password"}>
            <form onSubmit={handleReSet} className="space-y-6">
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
                    <CustomInput
                        label={"Confirm Password"}
                        id="cpassword"
                        name="cpassword"
                        type={"password"}
                        required
                        placeholder={"Confirm your password"}
                        // autoComplete="current-password"
                        // className="input"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn_primary "
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </AuthHeader>
    );
};

export default ResetPassword;
