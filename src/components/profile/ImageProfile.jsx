const ImageProfile = ({
    setFieldValue,
    userProfile,
    editForm,
    preview,
    setPreview,
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue("userImage", file); // Update Formik field value
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Update the preview state
            };
            reader.readAsDataURL(file); // Read the file to create a data URL
        }
    };

    return (
        <div className="flex items-center">
            {preview ? (
                <img
                    src={preview}
                    alt="user profile"
                    className="w-[6.25rem] h-[6.25rem] rounded-full border object-cover border-[#e74d60]"
                />
            ) : (
                <p className="w-[5rem] h-[5rem] rounded-full object-cover flex items-center justify-center text-4xl font-bold bg-[#002058] text-white uppercase">
                    {userProfile?.fullName?.[0]}
                </p>
            )}

            <div>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="file"
                        className={`text-sm text-primary font-semibold py-[0.625rem] px-4  min-w-[5.25rem] ${
                            !editForm
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                        } `}
                        disabled={editForm}
                    >
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            style={{ display: "none", cursor: "pointer" }}
                            onChange={handleFileChange}
                            disabled={editForm}
                            className="disabled:cursor-not-allowed opacity-50 "
                        />
                        Change
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ImageProfile;
