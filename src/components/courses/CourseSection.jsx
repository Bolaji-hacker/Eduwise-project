import { BsCheckCircle, BsFileEarmarkPdfFill } from "react-icons/bs";
import { LuChevronDown, LuTvMinimalPlay } from "react-icons/lu";
import { useGlobalContext } from "../../context/ContextExport";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

export const CourseSection = ({
    title,
    content,
    setactiveUrl,
    isOpen,
    setIsOpen,
    courseId,
    section
}) => {
    const { addToWatchFunc } = useGlobalContext()
    // console.log("section", section)
    // courseId, sectionTitle, lessonTitle

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
                    className={`text-md xl:text-lg font-bold text-left px-4 text-gray-900 cursor-pointer w-full flex items-center justify-between p-4 border-b ${isOpen === title ? "bg-gray-100" : ""
                        }`}
                >
                    <span className="capitalize"> {title}</span>
                    <LuChevronDown />
                </button>
                {isOpen === title && (
                    <p className="mt-2 text-gray-600">
                        {content?.map(
                            ({ lessonTitle, _id, duration, videoUrl, documentUrl, watched }, i) => {

                                return (
                                    <button
                                        key={_id}
                                        className="w-full text-left border-b "
                                        onClick={() => {
                                            setactiveUrl(videoUrl);
                                            // setCompleteUrl("");
                                        }}
                                    >
                                        <div className=" pl-4 px-4 py-2 text-sm text-black flex items-start gap-3">
                                            {watched ? <BiCheckboxChecked className="text-[#002058] text-2xl" /> :
                                                <button
                                                    onClick={() => {
                                                        addToWatchFunc(courseId, section?.sectionTitle, lessonTitle)
                                                    }}
                                                    className="p-0 m-0"
                                                >
                                                    <BiCheckbox className="text-[#002058] text-2xl  p-0 m-0" />
                                                </button>
                                            }
                                            {/* <BsCheckCircle className="text-[#002058] text-lg" onClick={() => {
                                                addToWatchFunc(courseId, section?.sectionTitle, lessonTitle)
                                            }} /> */}

                                            {/* <span>
                                                {i + 1}.
                                            </span> */}

                                            <div className="w-full">
                                                <h3 className="">{lessonTitle}</h3>
                                                <div className="flex items-center gap-3 justify-between w-full">
                                                    <p className="flex items-center italic  gap-1 mt-1">
                                                        <LuTvMinimalPlay /> {duration}{" "}
                                                        min
                                                    </p>
                                                    {documentUrl && <a href={documentUrl} target="_blank" className="border px-3 text-sm py-1 flex gap-3 rounded items-center" >
                                                        <BsFileEarmarkPdfFill /> Resources
                                                    </a>}
                                                </div>
                                            </div>
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
