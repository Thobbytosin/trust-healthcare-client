import { DoctorsBackendResponse } from "@/types/doctor.types";
import { useSearch } from "@/hooks/useSearch";
import { DoneOutlinedIcon } from "@/icons/icons";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  loading: boolean;
  data: DoctorsBackendResponse | undefined;
};

const SearchBanner = ({ loading, data }: Props) => {
  const params = useSearchParams();
  const totalDoctors = data?.results || 0;
  const resultsLength = data?.doctors?.length || 0;

  const currentSearch = params.get("search");
  const currentLocation = params.get("location");
  const currentSpecialization = params.get("specialization");
  const currentFilterValue = params.get("filter");
  // const currentFilterValue = params.get("filter");
  const { searchState } = useSearch();
  const { searchForm, filterValue, typingTrigger, userLocation } = searchState;
  const { location, specialization } = searchForm;

  if (loading)
    return (
      <div className="my-8 w-[90%] lg:w-[80%] mx-auto">
        <div className="h-[100px] w-[70%] animate-pulse bg-gray-300/50 overflow-clip rounded-xl" />
      </div>
    );

  return (
    <div className=" my-8 w-[90%] lg:w-[80%] mx-auto">
      {/* for location results */}
      {!typingTrigger && currentSearch && location?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              found in{" "}
              <span className=" text-primary capitalize">{currentSearch}</span>{" "}
              available for you.
            </h2>
            <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
              <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                <DoneOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                Book appointments with minimum wait-time & verified doctor
                details
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Sorry! No doctor found in{" "}
              <span className=" text-red-500 capitalize">{location}</span> at
              this time.
            </h2>
          </>
        )
      ) : null}

      {/* for user location results */}
      {!typingTrigger && currentLocation && userLocation?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              found near you.
            </h2>
            <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
              <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                <DoneOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                Book appointments with minimum wait-time & verified doctor
                details
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Sorry! <span className=" text-red-500">No doctor</span> found near
              your location at this time.
            </h2>
          </>
        )
      ) : null}

      {/* for specialization results */}
      {!typingTrigger &&
      currentSpecialization &&
      specialization?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              specialized in{" "}
              <span className=" text-primary capitalize">
                {currentSpecialization}
              </span>{" "}
              available for you.
            </h2>
            <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
              <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                <DoneOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                Book appointments with minimum wait-time & verified doctor
                details
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Sorry! No registered doctor specialized in{" "}
              <span className=" text-red-500 capitalize">{specialization}</span>{" "}
              yet at this time.
            </h2>
          </>
        )
      ) : null}

      {/* for filter results */}
      {!typingTrigger && currentFilterValue && filterValue?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              are <span className=" text-primary capitalize">available</span>{" "}
              right now.
            </h2>
            <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
              <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                <DoneOutlinedIcon fontSize="inherit" />
              </span>
              <span>
                Book appointments with minimum wait-time & verified doctor
                details
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Sorry! No doctor is{" "}
              <span className=" text-red-500 capitalize">available</span> at
              this time.
            </h2>
          </>
        )
      ) : null}

      {/* default text */}
      {!typingTrigger &&
      currentSpecialization === null &&
      currentSearch === null &&
      currentLocation === null &&
      currentFilterValue === null ? (
        <>
          <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
            Over {totalDoctors - 2} doctors available for you.
          </h2>
          <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
            <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
              <DoneOutlinedIcon fontSize="inherit" />
            </span>
            <span>
              Book appointments with minimum wait-time & verified doctor details
            </span>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SearchBanner;
