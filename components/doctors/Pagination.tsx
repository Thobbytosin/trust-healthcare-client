import { useSearch } from "@/hooks/useSearch";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  KeyboardDoubleArrowLeftOutlinedIcon,
  KeyboardDoubleArrowRightOutlinedIcon,
} from "@/icons/icons";
import { DoctorsBackendResponse } from "@/types/doctor.types";
import React, { useState } from "react";

type Props = {
  currentPage: string | null;
  data: DoctorsBackendResponse | undefined;
  handlePageChange: (value: number) => void;
};

const Pagination = ({ currentPage, data, handlePageChange }: Props) => {
  const { actions, searchState } = useSearch();
  const { setPageQuery } = actions;
  const { pageQuery = currentPage ? +currentPage : 1 } = searchState;

  const totalDoctors = data?.results || 0;
  const limit = data?.limit || 4;
  const totalPages = Math.ceil(totalDoctors / limit);
  const pagesArray: number[] = [];

  const windowSize = limit;
  const [windowStart, setWindowStart] = useState(0);
  const windowEnd = windowStart + windowSize;

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  const handleNext = (pageNum: number) => {
    if (pageQuery) {
      if (pageQuery < totalPages) {
        // check if page is not 1st page and last page
        const newPage = pageQuery + 1; // increase page by 1

        if (newPage > windowEnd) {
          // if page his greater than the window, update window start to the window end
          setWindowStart(windowEnd);
        }

        setPageQuery(newPage);

        handlePageChange(Math.min(totalPages, pageNum + 1));
      }
    }
  };

  const handlePrev = (pageNum: number) => {
    if (pageQuery) {
      if (pageQuery > 1) {
        const newPage = pageQuery - 1;

        if (newPage <= windowStart) {
          setWindowStart(Math.max(0, windowStart - windowSize));
        }

        setPageQuery(newPage);

        handlePageChange(Math.max(1, pageNum - 1));
      }
    }
  };

  const handlePageNum = (pageNum: number) => {
    setPageQuery(pageNum);

    handlePageChange(pageNum);

    // Adjust window dynamically if the page is clicked directly
    if (pageNum > windowEnd) {
      setWindowStart(windowStart + windowSize);
    } else if (pageNum <= windowStart) {
      setWindowStart(Math.max(0, windowStart - windowSize));
    }
  };

  return (
    <div className=" my-10 flex justify-center items-center gap-2 mt-8 bg-white w-full py-3 rounded-md mx-auto">
      {/* prev button */}
      <button
        onClick={() => pageQuery && handlePrev(pageQuery)}
        disabled={pageQuery === 1}
        className={`mr-6 w-8 h-8 rounded-md  ${
          pageQuery === 1
            ? "cursor-not-allowed border border-text-primary/20 text-text-primary/20"
            : "cursor-pointer text-primary border border-text-primary/60"
        }`}
      >
        {pageQuery && pageQuery <= windowSize ? (
          <>
            <ChevronLeftIcon />
          </>
        ) : (
          <>
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </>
        )}
      </button>

      {pageQuery && pageQuery > windowSize && (
        <div className=" text-primary text-xl">...</div>
      )}

      {pagesArray.slice(windowStart, windowEnd).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageNum(pageNum)}
          className={`rounded-md cursor-pointer flex justify-center items-center text-xs w-8 h-8 ${
            pageQuery === pageNum
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {totalPages > windowSize && pageQuery && pageQuery < totalPages && (
        <div className=" text-primary text-xl">...</div>
      )}

      <button
        onClick={() => pageQuery && handleNext(pageQuery)}
        disabled={pageQuery === totalPages}
        className={` ml-6 w-8 h-8 rounded-md  ${
          pageQuery === totalPages
            ? "cursor-not-allowed border border-text-primary/20 text-text-primary/20"
            : "cursor-pointer text-primary border border-text-primary/60"
        }  `}
      >
        {pageQuery && pageQuery < totalPages && totalPages > windowSize * 2 ? (
          <KeyboardDoubleArrowRightOutlinedIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </button>
    </div>
  );
};
export default Pagination;
