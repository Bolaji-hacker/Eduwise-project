import { useState } from "react";
import CourseContent from "../../components/profile/CourseContent";

const MyCourseContent = () => {
    const [title, setTitle] = useState("");
    return (
        <div className=" border-[#e9ecef] rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    {title}
                </h3>
            </div>
            <div className=" py-6 min-h-[60vh]">
                {/* <ProfilePanel /> */}
                <CourseContent setTitle={setTitle} title={title} />
            </div>
        </div>
    );
};

export default MyCourseContent;
