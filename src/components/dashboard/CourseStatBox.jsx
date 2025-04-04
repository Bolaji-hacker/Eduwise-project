import Skeleton from "react-loading-skeleton";
import { useGlobalContext } from "../../context/ContextExport";
import { cn } from "../../lib/utilities";

export function CourseStatBox({ boxData }) {
    const { isLecturer, fetchingAllCourse } = useGlobalContext()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {boxData?.map(({ id, title, value }) => {

                return (
                    <>
                        {fetchingAllCourse ?
                            <Skeleton className="h-[8rem]" >

                            </Skeleton> : <div
                                className={cn(
                                    "p-[1.5rem] border w-full bg-white",
                                    isLecturer && title === "Total Students" && "hidden"
                                )}
                                key={id}
                            >
                                <h3 className="sm:text-lg font-semibold text-[#685f78]  sm:mb-[0.625rem]">
                                    {title}
                                </h3>
                                <p className="text-2xl sm:text-4xl font-[700] text-[#002058]">
                                    {value < 10 ? `0${value}` : value}
                                </p>
                            </div>}
                    </>
                );
            })}
        </div>
    );
}
