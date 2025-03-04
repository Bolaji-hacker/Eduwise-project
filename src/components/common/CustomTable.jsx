import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { TiDocumentText } from "react-icons/ti";
import Pagination from "./Pagination";
import PreLoader from "./PreLoader";

const CustomTable = ({
    columns,
    tableHead = true,
    bodyClassName,
    data,
    isPaginated = true,
    onClickFunc = () => { },
    // tableType = "default",
    showAnimation = true,
}) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    console.log(setPageSize);
    const paginatedData = useMemo(() => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        return data?.slice(start, end);
    }, [data, pageIndex, pageSize]);

    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handlePageChange = (newPageIndex) => {
        setPageIndex(newPageIndex);
    };
    // tableType that require direct click shoulb be added  here.

    return (
        <div className="">
            <div className="max-w-full w-full overflow-auto rounded-xl border-[0.2px] border-black-100  mt-5 ">
                <table className="min-w-full ">
                    {tableHead && (
                        <thead className="">
                            {table?.getHeaderGroups()?.map((headerGroup) => (
                                <tr
                                    key={headerGroup.id}
                                    className="bg-gray-100 "
                                >
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header?.id}
                                            className="px-4 py-4 text-left text-sm font-normal text-black-300 min-h-16"
                                        >
                                            {flexRender(
                                                header?.column.columnDef.header,
                                                header?.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    )}


                    {showAnimation ?
                        <tbody className="relative">
                            <tr>
                                <td style={{ height: "50vh" }}></td>
                                <td className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex flex-col items-center justify-center text-black-300 text-base ">
                                    {/* <DotsLoaderComponent
                                variant="dark"
                                dimension="large"
                            /> */}
                                    <PreLoader />
                                </td>
                            </tr>
                        </tbody>
                        :
                        (<>

                            {!data?.length < 1 ? (

                                <tbody>
                                    {table?.getRowModel()?.rows?.map((row) => (
                                        <tr
                                            key={row.id}
                                            className={`${bodyClassName} border-t-[0.2px] border-black-10`}
                                        >
                                            {row?.getVisibleCells()?.map((cell) => (
                                                <td
                                                    key={cell?.id}
                                                    className="font-medium text-sm py-3 px-3"
                                                    onClick={() => {

                                                        onClickFunc();

                                                    }}
                                                >
                                                    {flexRender(
                                                        cell?.column.columnDef.cell,
                                                        cell?.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody className="relative">
                                    <tr>
                                        <td style={{ height: "50vh" }}></td>
                                        <td className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex flex-col items-center justify-center text-black-300 text-base ">
                                            {/* <DotsLoaderComponent
                                    variant="dark"
                                    dimension="large"
                                /> */}
                                            <TiDocumentText size={40} />

                                            <p>No Data to Show</p>
                                        </td>
                                    </tr>
                                </tbody>
                            )}

                        </>)}
                </table>
            </div>
            {isPaginated && (
                <Pagination
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalItems={data?.length}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default CustomTable;
