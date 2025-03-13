import { cn } from "../../lib/utilities";
import PreLoader from "./PreLoader";

const CustomButton = ({
    children,
    showAnimation = false,
    disabled = false,
    style,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled || showAnimation}
            className={cn(`btn  flex items-center gap-3 `, style)}
        >
            {showAnimation ? <PreLoader styles={"text-lg"} /> : ""} <span>{children}</span>
        </button>
    );
};

export default CustomButton;
