import React from "react";

type Props = {
  specialization: string | undefined;
};

const SpecialtyBannerError = ({ specialization }: Props) => {
  return (
    <>
      <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
        Sorry! No registered doctor specialized in{" "}
        <span className=" text-red-500 capitalize">{specialization}</span> yet
        at this time.
      </h2>
    </>
  );
};

export default SpecialtyBannerError;
