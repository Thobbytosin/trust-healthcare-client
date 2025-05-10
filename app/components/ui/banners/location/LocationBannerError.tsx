import React from "react";

type Props = {
  location: string | undefined;
};

const LocationBannerError = ({ location }: Props) => {
  return (
    <>
      <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
        Sorry! No doctor found in{" "}
        <span className=" text-red-500 capitalize">{location}</span> at this
        time.
      </h2>
    </>
  );
};

export default LocationBannerError;
