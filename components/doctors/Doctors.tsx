"use client";

import React from "react";
import DoctorsGrid from "./DoctorsGrid";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import SearchHeader from "../search/SearchHeader";
import SearchBanner from "../search/SearchBanner";

type Props = {};

const Doctors = (props: Props) => {
  return (
    <section className="min-h-screen bg-gray-200">
      <RevealWrapper key={"find-doctors"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-2xl" />
        {/* SEARCH HEADER */}
        <SearchHeader key={"search-header"} />

        {/* display search info */}
        <SearchBanner key={"search-banner"} />

        {/* doctors data */}
        <div>
          <DoctorsGrid key={"doctors-grid"} />
        </div>
      </RevealWrapper>
    </section>
  );
};
export default Doctors;
