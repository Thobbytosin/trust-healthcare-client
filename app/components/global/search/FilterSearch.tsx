import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useSearch } from "@/hooks/useSearch";
import useTooltip from "@/hooks/useTooltip";
import ToolTip from "@/components/ui/Tooltip";

type Props = {
  handlePageParamsChange: (
    type: "filter" | "search" | "specialization" | "sortBy",
    parameter: any,
    defaultPageNum?: number
  ) => any;
};

const FilterSearch = ({ handlePageParamsChange }: Props) => {
  const { actions, searchState } = useSearch();
  const { filterValue } = searchState;
  const { setFilterValue, setUserLocationSearched, setPageQuery } = actions;
  const showFilterTooltip = useTooltip("filter");

  return (
    <div className=" relative w-full flex items-center gap-2 ">
      <span className=" text-primary md:text-sm text-xs">Filter:</span>
      <div className=" w-fit h-[36px] bg-gray-100 border border-gray-200 rounded-md  flex justify-between items-center text-sm cursor-pointer">
        <Select
          value={filterValue}
          onValueChange={(value: string) => {
            setFilterValue(value);
            setUserLocationSearched(false);
            if (value === "available") {
              setPageQuery(1); // always set page to 1

              handlePageParamsChange("filter", value);
            } else {
              // clear all params
              const newUrl = window.location.pathname;
              window.history.replaceState({}, "", newUrl);
            }
          }}
        >
          <SelectTrigger
            id="filter"
            name="filter"
            aria-label="filter"
            data-testid="filter-doctors"
            disabled={filterValue?.trim() === ""}
            className="w-fit h-full border-none py-5 focus:outline-0 focus:border-0 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0 text-xs "
          >
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent className=" mt-3 bg-white border-none text-text-primary ">
            <SelectItem
              value="all"
              className=" transition-all duration-700 hover:bg-gray-200"
            >
              All
            </SelectItem>
            <SelectItem
              value="available"
              className=" transition-all duration-700 hover:bg-gray-200"
            >
              Available
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ToolTip message="Filter by option" show={showFilterTooltip} />
    </div>
  );
};

export default FilterSearch;
