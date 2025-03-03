import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/ContextExport";
import PreLoader from "../../components/common/PreLoader";

const Jobs = () => {
    const { getJobs, jobs, fetchingJobs } = useGlobalContext();
    useEffect(() => {
        getJobs();
    }, []);

    const colors = [
        "bg-[#fce1cc]",
        "bg-[#d4f6ed]",
        "bg-[#e3dbfa]",
        "bg-[#dff3fe]",
        "bg-[#fae2f4]",
        "bg-[#eceff4]",
    ];

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem] ">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex items-center ">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Recommended Jobs
                </h3>
                {/* <SearchInput /> */}
            </div>
            <div className="px-4 py-6 min-h-[70vh]">
                {fetchingJobs ? (
                    <PreLoader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job, index) => (
                            <JobCard
                                key={index}
                                job={job}
                                color={colors[index % colors.length]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;

const JobCard = ({ job, color }) => (
    <div className="bg-white shadow-lg rounded-3xl border p-4">
        <div className={`${color} rounded-3xl px-3 py-4`}>
            {/* <div className="flex justify-between items-center mb-2 min-h-[1.75rem] ">
                <span className="text-sm bg-white py-1 px-2 rounded-[1.875rem] ">
                    {job?.createdAt && format(job?.createdAt, "MMM do, yyyy")}
                </span>
                <span className="bg-gray-200 p-1 rounded-full">{job.icon}</span>
            </div> */}
            <h3 className="font-extrabold text-xl min-h-[3.5rem] mt-3" fontSize>
                {job.title}
            </h3>
            {/* <h4 className="text-gray-700 mb-2">{job.title}</h4> */}
            <div className="flex flex-wrap gap-3 mb-4 mt-5 items-end min-h-[4.5rem] ">
                {job?.skills?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-transparent h-fit text-sm px-3 py-1 rounded-[1.875rem] border border-[#000] "
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        <div className="mt-4 mb-2 flex gap-5  justify-between items-center">
            <div className=" max-w-1/2  overflow-hidden">
                <p className="text-base font-semibold min-h-[1.5rem]">
                    {job?.price || ""}
                </p>
                <p className="text-gray-500 text-sm">{job?.location}</p>
            </div>
            <Link to={job?.link} target={"_blank"}>
                <button className="bg-black text-white  mt-4 py-2 px-4 rounded-[1.875rem] hover:bg-gray-800">
                    Details
                </button>
            </Link>
        </div>
    </div>
);
