import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

type Props = {
  sortBy: string | undefined;
  setSortBy: (value: string) => void;
  setPage: (value: number) => void;
  handlePageParamsChange: (
    type: "filter" | "search" | "specialization" | "sortBy",
    parameter: any,
    defaultPageNum?: number
  ) => any;
  setSearchTrigger: (value: number) => void;
};

const SortSearch = ({
  sortBy,
  setSortBy,
  handlePageParamsChange,
  setPage,
  setSearchTrigger,
}: Props) => {
  return (
    <div className=" flex items-center gap-2 ">
      <span className=" text-primary md:text-sm text-xs">Sort By:</span>
      <div className=" w-fit h-[36px] bg-gray-100 border border-gray-200 rounded-md  flex justify-between items-center text-sm cursor-pointer relative">
        <Select
          value={sortBy}
          onValueChange={(value: string) => {
            setSortBy(value);

            setPage(1); // always set page to 1

            handlePageParamsChange("sortBy", value);

            setSearchTrigger(Date.now()); // to always trigger the useeffect
          }}
        >
          <SelectTrigger
            id="sort"
            name="sort"
            aria-label="sort"
            data-testid="sort-doctors"
            disabled={sortBy?.trim() === ""}
            className="w-fit h-full border-none py-5 focus:outline-0 focus:border-0 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0 text-xs "
          >
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent className=" mt-3 bg-white border-none text-text-primary ">
            <SelectItem
              value="Latest"
              className=" transition-all duration-700 hover:bg-gray-200"
            >
              Latest
            </SelectItem>
            <SelectItem
              value="Oldest"
              className=" transition-all duration-700 hover:bg-gray-200"
            >
              Oldest
            </SelectItem>
            <SelectItem
              value="Ratings"
              className=" transition-all duration-700 hover:bg-gray-200"
            >
              Ratings
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortSearch;
