import { cn } from "../../lib/utilities";
import PreLoader from "./PreLoader";

const CustomButton = ({
    children,
    showAnimation = false,
    disabled = false,
    style,
    iconStyles,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled || showAnimation}
            className={cn(`btn  flex items-center gap-3 `, style)}
        >
            {showAnimation && <PreLoader styles={"text-lg"} />}
            <div className={cn("flex items-center", iconStyles)}>
                {children}
            </div>
        </button>
    );
};

export default CustomButton;
