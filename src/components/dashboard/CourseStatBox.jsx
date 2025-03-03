export function CourseStatBox({ boxData }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {boxData?.map(({ id, title, value }) => {
                return (
                    <div className="p-[1.5rem] border w-full bg-white" key={id}>
                        <h3 className="sm:text-lg font-semibold text-[#685f78]  sm:mb-[0.625rem]">
                            {title}
                        </h3>
                        <p className="text-2xl sm:text-4xl font-[700] text-[#002058]">
                            {value < 10 ? `0${value}` : value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
