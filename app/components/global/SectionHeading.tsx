import React, { FC } from "react";

type Props = {
  heading: string;
  desc: string;
};

const SectionHeading: FC<Props> = ({ heading, desc }) => {
  return (
    <div>
      <h2 className=" text-center text-2xl md:text-4xl text-text-primary font-medium">
        {heading}
      </h2>
      <p className="text-sm md:text-base text-center text-text-light-gray w-fit md:max-w-[305px] mt-2 mx-auto font-light">
        {desc}
      </p>
    </div>
  );
};

export default SectionHeading;
