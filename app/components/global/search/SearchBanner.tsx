import { DoneOutlinedIcon } from "@/icons/icons";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  trigger: number;
  location: string | undefined;
  resultsLength: number;
  specialization: string | undefined;
  defaultData: any;
  filterValue: string | undefined;
};

const SearchBanner = ({
  location,
  resultsLength,
  trigger,
  specialization,
  defaultData,
  filterValue,
}: Props) => {
  const params = useSearchParams();

  const currentLocation = params.get("search") || "";
  const currentSpecialization = params.get("specialization") || "";
  const currentFilterValue = params.get("filter") || "";
  return (
    <div className=" my-8 w-[90%] lg:w-[80%] mx-auto">
      {/* for search results */}
      {trigger &&
      location !== "" &&
      location &&
      location.toLowerCase() === currentLocation.toLowerCase() ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              found in{" "}
              <span className=" text-primary capitalize">{location}</span>{" "}
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
          location.toLowerCase() === currentLocation.toLowerCase() && (
            <>
              <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                Sorry! No doctor found in{" "}
                <span className=" text-red-500 capitalize">{location}</span> at
                this time.
              </h2>
            </>
          )
        )
      ) : null}

      {/* for specialization results */}
      {trigger &&
      specialization !== "" &&
      specialization &&
      specialization.toLowerCase() === currentSpecialization.toLowerCase() ? (
        resultsLength >= 1 ? (
          <>
            <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
              Great! <span className=" text-primary">{resultsLength}</span>{" "}
              <span className=" text-primary">
                {resultsLength > 1 ? "doctors" : "doctor"}
              </span>{" "}
              specialized in{" "}
              <span className=" text-primary capitalize">{specialization}</span>{" "}
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
          specialization.toLowerCase() ===
            currentSpecialization.toLowerCase() && (
            <>
              <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                Sorry! No registered doctor specialized in{" "}
                <span className=" text-red-500 capitalize">
                  {specialization}
                </span>{" "}
                yet at this time.
              </h2>
            </>
          )
        )
      ) : null}

      {/* for filter results */}
      {trigger &&
      filterValue !== "" &&
      filterValue &&
      filterValue.toLowerCase() === currentFilterValue.toLowerCase() ? (
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
          filterValue.toLowerCase() === currentFilterValue.toLowerCase() && (
            <>
              <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                Sorry! No doctor is{" "}
                <span className=" text-red-500 capitalize">available</span> at
                this time.
              </h2>
            </>
          )
        )
      ) : null}

      {/* default text */}
      {trigger === 0 ? (
        <>
          <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
            Over {(defaultData?.grandTotalDoctors || 30) - 1} doctors available
            for you.
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
