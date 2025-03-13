import { Link } from "react-router-dom";
import AuthHeader from "../../../components/common/AuthHeader";
import CustomInput from "../../../components/common/CustomInput";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgetPassword } from "../../../lib/services";
import CustomButton from "../../../components/common/CustomButton";

// import toast from "react-hot-toast";

const ForgetPassword = () => {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const credentials = {
                email: email,
            };
            const response = await forgetPassword(credentials);
            toast.success(response?.message);
            setEmail("");
        } catch (error) {
            toast.error(error?.response?.data?.error);
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthHeader title={"Forgot Password ?"}>
            <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                    <CustomInput
                        label={" Email address"}
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder={"Enter your email"}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <CustomButton
                        type="submit"
                        disabled={loading}
                        style="btn btn_primary"
                        showAnimation={loading}
                    >
                        Submit
                    </CustomButton>
                </div>

                <div className="mt-5 text-xs text-gray-500 text-center">
                    Remember Password now?{" "}
                    <Link
                        to="/login"
                        className="text-xs font-semibold underline text-[#392c7d]"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthHeader>
    );
};

export default ForgetPassword;
