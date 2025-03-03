import { IoSearchOutline } from "react-icons/io5";

const CustomSearchBar = ({ placeholder, onChange }) => {
    return (
        <div className="relative flex-shrink">
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                className="pl-8 w-auto py-2 border border-gray-200 rounded-lg outline-none"
                onChange={onChange}
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-3">
                <IoSearchOutline className="text-lg" />
            </div>
        </div>
    );
};

export default CustomSearchBar;
