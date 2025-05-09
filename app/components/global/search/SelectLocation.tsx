import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import ToolTip from "../../ui/Tooltip";
import { useSearch } from "../../../hooks/useSearch";
import useTooltip from "@/hooks/useTooltip";

type Props = {
  handlePageParamsChange: (
    type: "filter" | "search" | "specialization",
    parameter: any,
    defaultPageNum?: number
  ) => any;
};

const SelectLocation: FC<Props> = ({ handlePageParamsChange }) => {
  const { actions, searchState } = useSearch();
  const { searchForm } = searchState;
  const { setPageQuery, setSearchForm, setUserLocationSearched } = actions;
  const showLocationTooltip = useTooltip("location-select");

  return (
    <div className=" relative w-full md:w-[190px] lg:w-[270px] h-fit  bg-gray-100  rounded-md">
      <Select
        value={searchForm.location}
        onValueChange={(value: string) => {
          setSearchForm({ ...searchForm, location: value });

          setPageQuery(1); // always set page to 1

          handlePageParamsChange("search", value);

          setUserLocationSearched(false);
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
          <SelectValue placeholder="Select Your Location" />
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
