import { TbLoader2 } from "react-icons/tb";

const PreLoader = () => {
    return (
        <div className="mt-10 min-h-[30vh] flex items-center justify-center ">
            <TbLoader2 className="animate-spin text-4xl" />
        </div>
    );
};

export default PreLoader;
