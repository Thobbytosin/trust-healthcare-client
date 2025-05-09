import React from "react";
import SelectLocation from "./SelectLocation";
import SpecializationForm from "./SpecializationForm";
import FilterSearch from "./FilterSearch";
import SortSearch from "./SortSearch";

type Props = {
  handlePageParamsChange: (
    type: "filter" | "search" | "specialization" | "sortBy",
    parameter: any,
    defaultPageNum?: number
  ) => any;
};

const SearchHeader = ({ handlePageParamsChange }: Props) => {
  return (
    <div className=" bg-white w-[90%] lg:w-[80%] mx-auto -mt-[50px] shadow-md shadow-black/10 rounded-xl min-h-fit p-6">
      {/* SEARCH FORM */}
      <div className=" w-full md:flex justify-between  ">
        {/* location */}
        <SelectLocation
          key={"select-location"}
          handlePageParamsChange={handlePageParamsChange}
        />

        <SpecializationForm
          key={"specialization-search-form"}
          handlePageParamsChange={handlePageParamsChange}
        />
      </div>

      {/* SORT/FILTER */}
      <div className=" mt-8 flex gap-10 md:gap-20 items-center">
        {/* filter */}
        <FilterSearch
          key={"filter-search"}
          handlePageParamsChange={handlePageParamsChange}
        />

        {/* sort */}
        <SortSearch
          key={"sort-search"}
          handlePageParamsChange={handlePageParamsChange}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
