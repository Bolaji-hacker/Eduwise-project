import { TbLoader2 } from "react-icons/tb";
import { cn } from "../../lib/utilities";

const PreLoader = ({ styles, ...props }) => {
    return (
        <TbLoader2 className={cn("animate-spin text-white", styles)} {...props} />
    );
};

export default PreLoader;
