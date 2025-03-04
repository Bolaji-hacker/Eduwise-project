
const CreateCourseLayout = ({ children, title, noOfSteps, currentStep, }) => {

    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b flex itesm-center justify-between">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    Courses / {title}
                </h3>

                <div className="bold">
                    step {currentStep} of {noOfSteps}
                </div>
            </div>

            <div className="px-4">
                {children}
            </div>
        </div>
    )
};

export default CreateCourseLayout;
