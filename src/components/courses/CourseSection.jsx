import { LuChevronDown, LuTvMinimalPlay } from "react-icons/lu";

export const CourseSection = ({
    title,
    content,
    setactiveUrl,
    isOpen,
    setIsOpen,
}) => {
    const handleToggle = () => {
        if (isOpen === title) {
            setIsOpen(null);
        } else {
            setIsOpen(title);
        }
    };

    return (
        <div className="">
            <div className="bg-white rounded-lg">
                <button
                    onClick={handleToggle}
                    className={`text-md xl:text-lg font-bold text-left px-4 text-gray-900 cursor-pointer w-full flex items-center justify-between p-4 border-b ${
                        isOpen === title ? "bg-gray-100" : ""
                    }`}
                >
                    <span className="capitalize"> {title}</span>
                    <LuChevronDown />
                </button>
                {isOpen === title && (
                    <p className="mt-2 text-gray-600">
                        {content?.map(
                            ({ lessonTitle, _id, duration, videoUrl }) => {
                                return (
                                    <button
                                        key={_id}
                                        className="w-full text-left border-b "
                                        onClick={() => {
                                            setactiveUrl(videoUrl);
                                            // setCompleteUrl("");
                                        }}
                                    >
                                        <div className=" pl-9 px-4 py-2 text-sm text-black">
                                            <h3 className="">{lessonTitle}</h3>
                                            <p className="flex items-center gap-1 mt-1">
                                                <LuTvMinimalPlay /> {duration}{" "}
                                                min
                                            </p>
                                        </div>
                                    </button>
                                );
                            }
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};
