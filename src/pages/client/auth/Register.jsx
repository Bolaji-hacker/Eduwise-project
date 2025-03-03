import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../../components/common/AuthHeader";

import { useState } from "react";
// import toast from "react-hot-toast";

import CustomInput from "../../../components/common/CustomInput";
import { registerUser } from "../../../lib/services";
import toast from "react-hot-toast";
import {
    Checkbox,
    
} from "../../../components/common/CustomCheckBox";

const Register = () => {
    const navigate = useNavigate();
    // const { signIn } = useAuthContext();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [interests, setInterests] = useState([]);

    const interestsData = [
        "Machine Learning",
        "Robotics",
        "Natural Language Processing (NLP)",
        "Cognitive Computing",
        "AI in Gaming",
    ];

    const handleInterestChange = (e, interest) => {
        const checked = e.target.checked;
        if (checked) {
            setInterests([...interests, interest]);
        } else {
            setInterests(interests.filter((i) => i !== interest));
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        let payload = {
            fullName: name,
            email: email,
            password: password,
            interests: interests,
        };
        try {
            const response = await registerUser(payload);
            // console.log("Login Successful:", response);
            toast.success(response?.message);
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error);
            console.error(error);
        }
    };

    return (
        <AuthHeader title={"Sign up "}>
            <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                    <div>
                        <CustomInput
                            label={" Full Name"}
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            required
                            placeholder={"Enter your Full Name"}
                            autoComplete="name"
                        />
                    </div>{" "}
                    <div>
                        <CustomInput
                            label={" Email address"}
                            placeholder={"Enter your email"}
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
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
                </div>
                <div className="mt-4">
                    <label
                        htmlFor={name}
                        className="block text-sm/6 font-medium text-gray-900 mb-2"
                    >
                        Area of interest?
                    </label>
                    {interestsData?.map((interest) => (
                        <Checkbox
                            key={interest}
                            id={interest}
                            name={interest}
                            label={interest}
                            onChange={(e) => handleInterestChange(e, interest)}
                        />
                    ))}
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn_primary ">
                        Create An Account
                    </button>
                </div>
                <div className="mt-5 text-xs text-gray-500 text-center">
                    Already have an account?{" "}
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

export default Register;
