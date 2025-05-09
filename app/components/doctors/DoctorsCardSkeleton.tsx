import React, { FC } from "react";

type Props = {};

const DoctorCardSkeleton: FC<Props> = () => {
  return (
    <div className=" w-full min-h-[fit] bg-white  rounded-xl overflow-clip cursor-pointer transition-all duration-700 hover:scale-95 p-4 flex items-start justify-between gap-2 lg:gap-4 mb-4">
      {/* image ske */}
      <div className=" lg:w-[30%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:h-[200px] animate-pulse bg-gray-200 overflow-clip rounded-full"></div>

      {/* details */}
      <div className="w-[70%] mt-2 px-3 lg:flex gap-4  h-full">
        <div className=" lg:min-w-[60%]">
          <div className=" text-lg hidden md:flex items-center gap-3 mt-4  w-full h-20 bg-gray-200 animate-pulse"></div>
          <div className=" text-lg hidden md:flex items-center gap-3 mt-4  w-full h-10 bg-gray-200 animate-pulse"></div>
          <div className=" text-lg hidden md:flex items-center gap-3 mt-8  w-full h-5 bg-gray-200 animate-pulse"></div>
        </div>

        {/* book appointment btn */}
        <div className="mt-4 lg:mt-0 flex flex-col  lg:items-center justify-end">
          <div className=" rounded-lg text-center bg-gray-200 w-[166px] h-[56px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;
