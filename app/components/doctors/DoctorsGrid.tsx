import React, { FC, useState } from "react";
import DoctorCard from "./DoctorCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  KeyboardDoubleArrowLeftOutlinedIcon,
  KeyboardDoubleArrowRightOutlinedIcon,
} from "../../../app/icons/icons";
import Sidebar from "./Sidebar";
import { IDoctor } from "@/store/useDoctorsStore";
import DoctorCardSkeleton from "./DoctorsCardSkeleton";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  loading: boolean;
  page: number | undefined;
  setPage: (value: number) => void;
  handlePageChange: (value: number) => any;
  doctorsData: IDoctor[];
  location: string | undefined;
  setLocationSearched: (value: boolean) => void;
  locationSearched: boolean;
  totalDoctors: number;
  limit: number;
  resetAll: () => void;
  setSearchTrigger: (value: number) => void;
};

const DoctorsGrid: FC<Props> = ({
  loading,
  page,
  setPage,
  handlePageChange,
  doctorsData,
  location,
  locationSearched,
  setLocationSearched,
  totalDoctors,
  limit,
  resetAll,
  setSearchTrigger,
}) => {
  // const limit = 4;
  // const skip = (page - 1) * limit;

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
    if (page) {
      if (page < totalPages) {
        // check if page is not 1st page and last page
        const newPage = page + 1; // increase page by 1

        if (newPage > windowEnd) {
          // if page his greater than the window, update window start to the window end
          setWindowStart(windowEnd);
        }

        setPage(newPage);

        handlePageChange(Math.min(totalPages, pageNum + 1));
      }
    }
  };

  const handlePrev = (pageNum: number) => {
    if (page) {
      if (page > 1) {
        const newPage = page - 1;

        if (newPage <= windowStart) {
          setWindowStart(Math.max(0, windowStart - windowSize));
        }

        setPage(newPage);

        handlePageChange(Math.max(1, pageNum - 1));
      }
    }
  };

  const handlePageNum = (pageNum: number) => {
    setPage(pageNum);

    handlePageChange(pageNum);

    // Adjust window dynamically if the page is clicked directly
    if (pageNum > windowEnd) {
      setWindowStart(windowStart + windowSize);
    } else if (pageNum <= windowStart) {
      setWindowStart(Math.max(0, windowStart - windowSize));
    }
  };

  const clearAllQueryParams = () => {
    router.push(pathname); // removes all search/query params
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
          ? [1, 2, 3, 4].map((doctor: any, index) => (
              <DoctorCardSkeleton key={index} doctor={doctor} />
            ))
          : doctorsData.map((doctor: any, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}

        {!loading && page && doctorsData.length >= 1 ? (
          <div className=" my-10 flex justify-center items-center gap-2 mt-8 bg-white w-full py-3 rounded-md mx-auto">
            <button
              onClick={() => handlePrev(page)}
              disabled={page === 1}
              className={`mr-6 w-8 h-8 rounded-md  ${
                page === 1
                  ? "cursor-not-allowed border border-text-primary/20 text-text-primary/20"
                  : "cursor-pointer text-primary border border-text-primary/60"
              }`}
            >
              {page <= windowSize ? (
                <>
                  <ChevronLeftIcon />
                </>
              ) : (
                <>
                  <KeyboardDoubleArrowLeftOutlinedIcon />
                </>
              )}
            </button>

            {page && page > windowSize && (
              <div className=" text-primary text-xl">...</div>
            )}

            {pagesArray.slice(windowStart, windowEnd).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageNum(pageNum)}
                className={`rounded-md cursor-pointer flex justify-center items-center text-xs w-8 h-8 ${
                  page === pageNum
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > windowSize && page && page < totalPages && (
              <div className=" text-primary text-xl">...</div>
            )}

            <button
              onClick={() => handleNext(page)}
              disabled={page === totalPages}
              className={` ml-6 w-8 h-8 rounded-md  ${
                page === totalPages
                  ? "cursor-not-allowed border border-text-primary/20 text-text-primary/20"
                  : "cursor-pointer text-primary border border-text-primary/60"
              }  `}
            >
              {page < totalPages && totalPages > windowSize * 2 ? (
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

      {/* SIDEBAR
      <div className=" w-full md:w-[30%] relative md:my-0 mb-12">
        <Sidebar
          location={location}
          doctorsData={doctorsData}
          setActiveSpecialization={setActiveSpecialization}
          setSearched={setSearched}
          searched={searched}
          handleFilterChange={handleFilterChange}
        />
      </div> */}
    </section>
  );
};

export default DoctorsGrid;
