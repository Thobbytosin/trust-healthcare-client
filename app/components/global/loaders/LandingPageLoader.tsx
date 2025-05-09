import Image from "next/image";
import React from "react";

const LandingPageLoader = () => {
  return (
    <div className=" bg-white/80 w-screen h-screen flex items-center justify-center z-50">
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading..."
        aria-label="loading_icon"
        height={150}
        width={150}
        priority
      />
    </div>
  );
};

export default LandingPageLoader;
