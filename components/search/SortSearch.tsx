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
import { toast } from "sonner";

type Props = {};

const SortSearch = (props: Props) => {
  const { actions, searchState } = useSearch();
  const { setSortBy, setPageQuery } = actions;
  const { sortBy } = searchState;
  const showSortTooltip = useTooltip("sort");
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const handlePageParamsChange = (
    type: "sortBy",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "sortBy") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("sortBy", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);

    toast.success("Doctors List Sorted", {
      duration: 4000,
    });
  };

  return (
    <div className=" w-full relative flex items-center gap-2 ">
      <span className=" text-primary md:text-sm text-xs">Sort By:</span>
      <div className=" w-fit h-[36px] bg-gray-100 border border-gray-200 rounded-md  flex justify-between items-center text-sm cursor-pointer relative">
        <Select
          value={sortBy}
          onValueChange={(value: string) => {
            setSortBy(value);

            setPageQuery(1); // always set page to 1

            handlePageParamsChange("sortBy", value);
          }}
        >
          <SelectTrigger
            id="sort"
            name="sort"
            aria-label="sort"
            data-testid="sort-doctors"
            disabled={sortBy?.trim() === ""}
            className="w-fit h-full border-none py-5 focus:outline-0 focus:border-0 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0 text-[10px] md:text-xs  "
          >
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className=" mt-3 bg-white border-none text-text-primary text-[10px] md:text-xs font-poppins ">
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
      <ToolTip message="Sort by option" show={showSortTooltip} />
    </div>
  );
};

export default SortSearch;
