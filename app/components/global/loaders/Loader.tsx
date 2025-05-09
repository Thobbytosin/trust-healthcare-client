import Image from "next/image";
import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className=" fixed left-0 top-0 h-full w-full bg-white/80 z-100 flex justify-center items-center">
      <Image
        src="/assets/icons/loader.svg"
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

export default Loader;
