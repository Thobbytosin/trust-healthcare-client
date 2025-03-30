"use client";

import React, { useState } from "react";
import RevealWrapper, { fadeInDown } from "../global/RevealWrapper";
import SearchHeader from "../global/search/SearchHeader";
import { SearchForm } from "../doctors/FindDoctors";

type Props = {};

const DoctorPage = (props: Props) => {
  const initalSearchFormValues = { location: "", parameter: "" };
  const [searchForm, setSearchForm] = useState<SearchForm>(
    initalSearchFormValues
  );
  const [showOptions, setShowOptions] = useState(false);
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("Latest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  return (
    <section>
      <RevealWrapper key={"doctor"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
        {/* SEARCH HEADER */}
        <SearchHeader
          key={"search-header"}
          filterValue={filterValue}
          searchForm={searchForm}
          setFilterValue={setFilterValue}
          setSearchForm={setSearchForm}
          setShowOptions={setShowOptions}
          setShowSortOptions={setShowSortOptions}
          setSortValue={setSortValue}
          showOptions={showOptions}
          showSortOptions={showSortOptions}
          sortValue={sortValue}
        />
      </RevealWrapper>
    </section>
  );
};

export default DoctorPage;
