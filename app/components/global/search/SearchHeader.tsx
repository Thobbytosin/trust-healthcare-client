import React from "react";
import SelectLocation from "./SelectLocation";
import SpecializationForm from "./SpecializationForm";
import FilterSearch from "./FilterSearch";
import SortSearch from "./SortSearch";
import SearchUserLocation from "./SearchUserLocation";

type Props = {};

const SearchHeader = (props: Props) => {
  return (
    <div className=" bg-white w-[90%] lg:w-[80%] mx-auto -mt-[50px] shadow-md shadow-black/10 rounded-2xl min-h-fit p-6">
      {/* SEARCH FORM */}
      <div className=" w-full md:flex justify-between  ">
        {/* location */}
        <SelectLocation key={"select-location"} />

        <SpecializationForm key={"specialization-search-form"} />
      </div>

      {/* SORT/FILTER */}
      <div className=" mt-8 flex gap-10 md:gap-20 items-center">
        {/* filter */}
        <FilterSearch key={"filter-search"} />

        {/* sort */}
        <SortSearch key={"sort-search"} />
      </div>

      {/* USER LOCATION */}
      <div className="block md:hidden">
        <SearchUserLocation mobile />
      </div>
    </div>
  );
};

export default SearchHeader;
