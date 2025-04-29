import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { SearchDoctorForm } from "../../../types/all.types";
import ToolTip from "../../ui/Tooltip";

type Props = {
  searchForm: SearchDoctorForm;
  setSearchForm: (value: SearchDoctorForm) => void;
  setPage: (value: number) => void;
  handlePageParamsChange: (
    type: string,
    parameter: any,
    defaultPageNum?: number
  ) => any;
  setSearchTrigger: (value: number) => void;
  showLocationTooltip: boolean;
};

const SelectLocation: FC<Props> = ({
  searchForm,
  setSearchForm,
  setPage,
  handlePageParamsChange,
  setSearchTrigger,
  showLocationTooltip,
}) => {
  return (
    <div className=" relative w-full md:w-[190px] lg:w-[270px] h-fit  bg-gray-100  rounded-md">
      <Select
        value={searchForm.location}
        onValueChange={(value: string) => {
          setSearchForm({ ...searchForm, location: value });

          setPage(1); // always set page to 1

          handlePageParamsChange("search", value);

          setSearchTrigger(Date.now()); // to always trigger the useeffect
        }}
      >
        <SelectTrigger
          id="location-select"
          name="location"
          aria-label="Location"
          data-testid="location-select"
          disabled={searchForm.specialization !== ""}
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
