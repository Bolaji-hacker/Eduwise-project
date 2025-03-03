import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

const Pagination = ({ pageIndex, pageSize, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePrevPage = () => {
        if (pageIndex > 0) {
            onPageChange(pageIndex - 1);
        }
    };

    const handleNextPage = () => {
        if (pageIndex < totalPages - 1) {
            onPageChange(pageIndex + 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-between py-2 mt-5">
            <span className="text-sm text-gray-700">
                {`1 - ${
                    totalItems < pageSize
                        ? totalItems
                        : pageSize * (pageIndex + 1)
                } of ${totalItems} items`}
            </span>
            <div className="flex space-x-1">
                <button
                    className="rounded-lg border-[0.5px] border-black-100 h-8 w-8 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-55"
                    onClick={handlePrevPage}
                    disabled={pageIndex === 0}
                >
                    <HiMiniChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, page) => (
                    <button
                        key={page}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg border-[0.5px] border-black-100 text-black-300 text-sm ${
                            pageIndex === page
                                ? "bg-green-500 border-none  text-black-500"
                                : "bg-transparent "
                        }`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className="rounded-lg border-[0.5px] border-black-100 h-8 w-8 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-55"
                    onClick={handleNextPage}
                    disabled={pageIndex === totalPages - 1}
                >
                    <HiMiniChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
