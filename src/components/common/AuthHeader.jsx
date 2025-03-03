const AuthHeader = ({ title, children }) => {
    return (
        <div>
            <div className="bg-white rounded-[0.625rem] py-8 md:p-8 ">
                {/* title and describtion */}
                <div className="text-left mb-9">
                    <p className="text-2xl font-bold  text-primary_text_1 ">
                        {title}
                    </p>
                </div>
                <div className="w-full"> {children}</div>
            </div>
        </div>
    );
};

export default AuthHeader;
