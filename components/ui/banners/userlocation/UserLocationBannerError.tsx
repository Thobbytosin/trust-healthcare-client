import React from "react";

const UserLocationBannerError = () => {
  return (
    <>
      <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
        Sorry! <span className=" text-red-500">No doctor</span> found near your
        location at this time.
      </h2>
    </>
  );
};

export default UserLocationBannerError;
