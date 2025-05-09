import Image from "next/image";
import React from "react";

const ButtonLoader = () => {
  return (
    <div className=" flex items-center justify-center z-50 my-6">
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading..."
        aria-label="loading_icon"
        width={30}
        height={30}
        // className=" w-[10%] h-[10%]"
        priority
      />
    </div>
  );
};

export default ButtonLoader;
