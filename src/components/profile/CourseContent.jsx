import { useEffect, useState } from "react";
import { CourseSection } from "../courses/CourseSection";
import { useGlobalContext } from "../../context/ContextExport";
import { useParams } from "react-router-dom";
import PreLoader from "../common/PreLoader";
import { EmptyCourses } from "../dashboard/EmptyCourses";
const CourseContent = ({ setTitle }) => {
    const { id } = useParams();
    const [activeUrl, setActiveUrl] = useState(
        "https://www.youtube.com/embed/AQzEASEDiK4?si=ig4Zwb_QiZAKSznL"
    );
    const [activeSection, setActiveSection] = useState(null);
    // const [completeUrl, setCompleteUrl] = useState("");
    const {
        fetchingCourseContent,
        getCourseContent,
        currentCourseContent,
        currentCourse,
    } = useGlobalContext();

    useEffect(() => {
        getCourseContent(id);
    }, []);
    useEffect(() => {
        setActiveUrl(currentCourseContent?.[0]?.lessons?.[0]?.videoUrl);
        setTitle(currentCourse?.title);
        // console.log(currentCourse?.title);
    }, [currentCourse, currentCourseContent]);

    return (
        <div>
            {fetchingCourseContent ? (
                <PreLoader />
            ) : (
                <div>
                    <>
                        {currentCourseContent?.length > 0 ? (
                            <div className="flex flex-col xl:flex-row gap-4 relative ">
                                {/* /preview section */}
                                <div className=" w-full xl:max-w-[786px]  2xl:max-w-[816px] xl:fixed ">
                                    <iframe
                                        width="100%"
                                        height="450"
                                        src={activeUrl}
                                        title="YouTube video player"
                                        // frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className=""
                                    ></iframe>

                                    {/* <button className="mt-5">
                                        Mark as watched
                                    </button> */}
                                </div>
                                <div className="flex w-full md:max-w-[70%]"></div>

                                {/* section info  */}
                                <div className=" w-full xl:max-w-[35%] min-h-full ">
                                    <h3 className="text-xl font-semibold border-b px-4 py-3 bg-white">
                                        Course content
                                    </h3>

                                    {currentCourseContent?.map(
                                        (section, index) => (
                                            <CourseSection
                                                key={index}
                                                title={section?.sectionTitle}
                                                content={section?.lessons}
                                                setactiveUrl={setActiveUrl}
                                                // setCompleteUrl={setCompleteUrl}
                                                currentCourse={currentCourse}
                                                setIsOpen={setActiveSection}
                                                isOpen={activeSection}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <EmptyCourses
                                    text={"This courses has no content yet. "}
                                    btnText="Explore Other Courses"
                                />
                            </div>
                        )}
                    </>
                </div>
            )}
        </div>
    );
};

export default CourseContent;
