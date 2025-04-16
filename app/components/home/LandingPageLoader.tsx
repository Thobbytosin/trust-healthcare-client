import Image from "next/image";
import React from "react";

const LandingPageLoader = () => {
  return (
    <div className=" bg-white/80 w-screen h-screen flex items-center justify-center z-50">
      <Image
        src="/assets/loader.svg"
        alt="Loading..."
        aria-label="loading_icon"
        width={10}
        height={10}
        className=" w-[10%] h-[10%]"
        priority
      />
    </div>
  );
};

export default LandingPageLoader;
