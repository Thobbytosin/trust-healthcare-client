import React from "react";

type Props = {};

const FilterBannerError = (props: Props) => {
  return (
    <>
      <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
        Sorry! No doctor is{" "}
        <span className=" text-red-500 capitalize">available</span> at this
        time.
      </h2>
    </>
  );
};

export default FilterBannerError;
