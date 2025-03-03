const CustomButton = ({
    children,
    loading = false,
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            }`}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 4a16 16 0 0116 16"
                    />
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default CustomButton;
