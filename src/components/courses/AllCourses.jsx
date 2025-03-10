import { useEffect, useState } from "react";
import CustomSearchBar from "../common/CustomSearchBar";
import { useAuthContext, useGlobalContext } from "../../context/ContextExport";
import { CourseCard } from "../common/CourseCard";
import PreLoader from "../common/PreLoader";

const AllCourses = ({ enrollId }) => {
    const { isLoggedIn } = useAuthContext();

    const { courses, enrollCoursesFunc, fetchingAllCourse } =
        useGlobalContext();
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setFilteredData(courses);
    }, [courses]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filteredData = courses?.filter((item) => {
            return (
                item?.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                ||
                item.description
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                item.teacher
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });

        setFilteredData(filteredData);
    };
    console.log('====================================');
    console.log("filteredData", filteredData);
    console.log('====================================');

    console.log('====================================');
    console.log("searchQuery", searchQuery);
    console.log('====================================');


    console.log('====================================');
    console.log("courses", courses);
    console.log('====================================');

    return (
        <div className={` px-4 ${isLoggedIn ? "pt-[10px]" : "pt-[4.125rem]"} `}>
            <div className="max-w-[80rem] mx-auto mt-10 ">
                <div className="flex">
                    <CustomSearchBar
                        placeholder="Search our courses"
                        onChange={handleSearch}
                    />
                </div>
                {fetchingAllCourse ? (
                    <PreLoader />
                ) : (
                    <div
                        className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  ${isLoggedIn ? "" : "lg:grid-cols-4"
                            } gap-5`}
                    >
                        {!fetchingAllCourse && filteredData?.length > 0 ? (
                            <>
                                {filteredData?.map((item) => {
                                    const isEnrolled = enrollId.includes(
                                        item?._id
                                    );
                                    return (
                                        <CourseCard
                                            key={item._id}
                                            item={item}
                                            path="courses"
                                            enrolFunc={() =>
                                                enrollCoursesFunc(
                                                    item._id,
                                                    "/courses"
                                                )
                                            }
                                            isEnrolled={isEnrolled}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <div className="">
                                0 search results for: {searchQuery}{" "}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;
