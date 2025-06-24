import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import ToolTip from "../../ui/Tooltip";
import { useSearch } from "@/hooks/useSearch";
import useTooltip from "@/hooks/useTooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const SelectLocation: FC<Props> = () => {
  const queryParams = useSearchParams() || null;
  const router = useRouter();
  const pathname = usePathname();
  const { actions, searchState } = useSearch();
  const { searchForm } = searchState;
  const { setPageQuery, setSearchForm } = actions;
  const showLocationTooltip = useTooltip("location-select");

  const handlePageParamsChange = (
    type: "search",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "search") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("search", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className=" relative w-full md:w-[190px] lg:w-[270px] h-fit  bg-gray-100  rounded-md">
      <Select
        value={searchForm.location}
        onValueChange={(value: string) => {
          setSearchForm({ ...searchForm, location: value });

          setPageQuery(1); // always set page to 1

          handlePageParamsChange("search", value);
        }}
      >
        <SelectTrigger
          id="location-select"
          name="location"
          aria-label="Location"
          data-testid="location-select"
          disabled={
            typeof searchForm.specialization === "string" &&
            searchForm.specialization?.trim()?.length > 0
          }
          className="w-full border border-gray-200 py-5 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0  "
        >
          <SelectValue placeholder="Search by Location" />
        </SelectTrigger>
        <SelectContent className=" mt-3 bg-white border-none text-text-primary">
          <SelectItem
            value="Lagos"
            className=" transition-all duration-700 hover:bg-gray-200"
          >
            Lagos
          </SelectItem>
          <SelectItem
            value="Berlin"
            className=" transition-all duration-700 hover:bg-gray-200"
          >
            Berlin
          </SelectItem>
          <SelectItem
            value="Abuja"
            className=" transition-all duration-700 hover:bg-gray-200"
          >
            Abuja
          </SelectItem>
        </SelectContent>
      </Select>
      <ToolTip
        message="Select your preferred location"
        show={showLocationTooltip}
      />
    </div>
  );
};

export default SelectLocation;
