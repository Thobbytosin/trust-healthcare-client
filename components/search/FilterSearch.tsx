import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearch } from "@/hooks/useSearch";
import useTooltip from "@/hooks/useTooltip";
import ToolTip from "@/components/ui/Tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const FilterSearch = (props: Props) => {
  const { actions, searchState } = useSearch();
  const { filterValue } = searchState;
  const { setFilterValue, setPageQuery } = actions;
  const showFilterTooltip = useTooltip("filter");
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const handlePageParamsChange = (
    type: "filter",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "filter") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("filter", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className=" relative w-full flex items-center gap-2 ">
      <span className=" text-primary md:text-sm text-xs">Filter:</span>
      <div className=" w-fit h-[36px] bg-gray-100 border border-gray-200 rounded-md  flex justify-between items-center text-sm cursor-pointer">
        <Select
          value={filterValue}
          onValueChange={(value: string) => {
            setFilterValue(value);

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
            className="w-fit h-full border-none py-5 focus:outline-0 focus:border-0 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0 text-[10px] md:text-xs "
          >
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className=" mt-3 bg-white border-none text-text-primary text-[10px] md:text-xs font-poppins">
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
