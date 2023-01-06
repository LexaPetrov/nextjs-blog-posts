import React, {memo} from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  count?: number;
  page?: number;
  onPageChange?: (selectedItem: {selected: number}) => void;
  className?: string;
  limit?: number;
};
export const Pagination: React.FC<PaginationProps> = memo(
  ({count = 0, page, onPageChange, limit = 10}) => {
    return (
      <ReactPaginate
        containerClassName="w-[100%] relative my-5 z-0 m-auto w-fit flex flex-row justify-center rounded-md shadow-sm -space-x-px"
        nextLabel="Next"
        previousLabel="Previous"
        nextClassName="[&>a]:w-[100%] [&>a]:h-[100%] select-none relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        previousClassName="[&>a]:w-[100%] [&>a]:h-[100%] select-none relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        forcePage={page}
        breakLabel="..."
        breakClassName="border border-gray-300 w-[50px] flex items-center justify-center text-center color-primary-400 bg-white text-sm font-medium text-gray-500"
        pageClassName="leading-[35px] [&>a]:w-[100%] [&>a]:h-[100%] border border-gray-300 w-[50px] flex items-center justify-center text-center color-primary-400 bg-white text-sm font-medium text-gray-500"
        pageCount={Math.ceil(count / limit)}
        activeClassName="!text-blue-500 bg-blue-100"
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={onPageChange}
      />
    );
  },
);
