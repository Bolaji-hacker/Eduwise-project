import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const CustomInput = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    ...rest
}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm/6 font-medium text-gray-900 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={show ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`block w-full rounded-md bg-white  text-base text-[#685f78] outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed ${error && touched
                        ? "border-red-500"
                        : "border-[#ffdedab5]"
                        } py-2 pl-3 pr-10 text-sm focus:border-indigo-300 focus:ring-indigo-300`}
                    {...rest}
                />
                {/* {error && touched && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                            className="h-5 w-5 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                            <path d="M15.354 50.05-.707-.707A1 1 0 0013.5 49.5L15.354 48 16 49.293 13.5 50.5 12 49.207 10.354 50.05 9 48.783 7.646 49.207 6.5 48.5a1 1 0 00-1-1z" />
                        </svg>
                    </div>
                )} */}

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute top-1/2 -translate-y-1/2 right-4 "
                    >
                        {show ? (
                            <FaEyeSlash className="text-gray-500" />
                        ) : (
                            <FaEye className="text-gray-500" />
                        )}
                    </button>
                )}
            </div>
            {error && touched && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default CustomInput;
