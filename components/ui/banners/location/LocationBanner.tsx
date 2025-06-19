import { DoneOutlinedIcon } from "@/icons/icons";
import React from "react";

type Props = {
  currentSearch: string | null;
  resultsLength: number;
};

const LocationBanner = ({ currentSearch, resultsLength }: Props) => {
  return (
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
          Book appointments with minimum wait-time & verified doctor details
        </span>
      </p>
    </>
  );
};

export default LocationBanner;
