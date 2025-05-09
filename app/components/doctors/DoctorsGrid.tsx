import React, { FC, useState } from "react";
import DoctorCard from "./DoctorCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  KeyboardDoubleArrowLeftOutlinedIcon,
  KeyboardDoubleArrowRightOutlinedIcon,
} from "@/icons/icons";
import Sidebar from "./Sidebar";
import DoctorCardSkeleton from "./DoctorsCardSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DoctorsBackendResponse, IDoctor } from "@/types/doctor.types";
import { useSearch } from "@/hooks/useSearch";

type Props = {
  loading: boolean;
  handlePageChange: (value: number) => any;
  data: DoctorsBackendResponse | undefined;
};

const DoctorsGrid: FC<Props> = ({ loading, handlePageChange, data }) => {
  const params = useSearchParams();
  const totalDoctors = data?.results || 0;
  const limit = data?.limit || 4;
  const doctorsData = data?.doctors || [];
  const { actions, searchState } = useSearch();
  const { setPageQuery, resetAll, setSearchTrigger } = actions;
  const currentPage = params?.get("page");
  const { pageQuery = currentPage ? +currentPage : 1 } = searchState;

  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalDoctors / limit);
  const pagesArray = [];

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

  const clearAllQueryParams = () => {
    if (pathname) router.push(pathname); // removes all search/query params
  };

  const handleReset = () => {
    resetAll();
    clearAllQueryParams();

    setSearchTrigger(0); // to trigger the useffect
  };

  return (
    <section className=" w-[90%] lg:w-[80%] mx-auto flex flex-col md:flex-row gap-4 lg:gap-8 justify-between">
      <div className=" w-full md:w-[70%] h-fit">
        {loading
          ? [1, 2, 3, 4].map((_, index) => <DoctorCardSkeleton key={index} />)
          : doctorsData.map((doctor: any, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}

        {!loading && doctorsData.length >= 1 ? (
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
              {pageQuery &&
              pageQuery < totalPages &&
              totalPages > windowSize * 2 ? (
                <KeyboardDoubleArrowRightOutlinedIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={handleReset}
            className=" underline text-primary cursor-pointer"
          >
            See other doctors
          </button>
        )}
      </div>

      {/* SIDEBAR */}
      <div className=" w-full md:w-[30%] relative md:my-0 mb-12">
        <Sidebar doctorsData={doctorsData} />
      </div>
    </section>
  );
};

export default DoctorsGrid;
