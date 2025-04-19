import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  ExpandMoreOutlinedIcon,
  SearchOutlinedIcon,
} from "../../../../app/icons/icons";
import { SearchDoctorForm } from "@/components/doctors/Doctors";
import { useSearchParams } from "next/navigation";
import useTooltip from "@/hooks/useTooltip";
import ToolTip from "@/components/helpers/Tooltip";

// filter options
const filterOptions = [{ option: "All" }, { option: "Available" }];

// sort options
const sortOptions = [
  { option: "Latest" },
  { option: "Ratings" },
  { option: "Oldest" },
];

type Props = {
  setSearchForm: (value: object) => void;
  searchForm: SearchDoctorForm;
  setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSortOptions: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: string;
  showFilterOptions: boolean;
  setFilterValue: (value: string) => void;
  setSearchTrigger: (value: number) => void;
  setPage: (value: number) => void;
  sortBy: string;
  showSortOptions: boolean;
  setSortBy: (value: string) => void;
  handleSearchChange: (
    type: string,
    parameter: any,
    defaultPageNum?: number
  ) => any;
};

const SearchHeader: FC<Props> = ({
  setSearchForm,
  searchForm,
  filterValue,
  setShowFilterOptions,
  showFilterOptions,
  setSearchTrigger,
  setFilterValue,
  setPage,
  sortBy,
  showSortOptions,
  setSortBy,
  setShowSortOptions,
  handleSearchChange,
}) => {
  const optionsRef = useRef<HTMLUListElement>(null);
  const sortRef = useRef<HTMLUListElement>(null);
  const params = useSearchParams();
  const showLocationTooltip = useTooltip("location-select");
  const showSpecializationTooltip = useTooltip("specialization");

  //   close the drop down when clicking anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (optionsRef.current &&
          !optionsRef.current.contains(event.target as Node)) ||
        (sortRef.current && !sortRef.current.contains(event.target as Node))
      ) {
        setShowFilterOptions(false);
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // search by specialization
  const handleSubmitSpecializationSearchForm = (e: FormEvent) => {
    e.preventDefault();

    const currentSpecialization = params.get("specialization") || "";
    if (searchForm.specialization === "") return;

    if (
      searchForm.specialization.toLowerCase() ===
      currentSpecialization.toLowerCase()
    )
      return; // to avoid searching same location again

    setPage(1); // always set page to 1

    handleSearchChange("specialization", searchForm.specialization);

    setSearchTrigger(Date.now()); // to always trigger the useeffect
  };

  const currentSpecialization = params.get("specialization") || "";

  return (
    <div className=" bg-white w-[90%] lg:w-[80%] mx-auto -mt-[50px] shadow-md shadow-black/10 rounded-xl min-h-fit p-6">
      {/* SEARCH FORM */}
      <div className=" w-full md:flex justify-between  ">
        {/* location */}
        <div className=" relative w-full md:w-[190px] lg:w-[270px] h-fit  bg-gray-100  rounded-md">
          <Select
            value={searchForm.location}
            onValueChange={(value: string) => {
              setSearchForm({ ...searchForm, location: value });

              setPage(1); // always set page to 1

              handleSearchChange("search", value);

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

        <form
          onSubmit={handleSubmitSpecializationSearchForm}
          className="md:w-fit md:flex"
          autoComplete="off"
        >
          {/* specialization */}
          <div className="md:ml-4 mt-3 md:mt-0 relative w-full md:w-[250px] lg:w-[400px] bg-gray-100  border border-gray-200 rounded-md">
            <input
              id="specialization"
              name="specialization"
              aria-label="Specialization"
              data-testid="specialization-input"
              type="text"
              placeholder="Search by Specialization..."
              className=" outline-none bg-transparent h-[41.33px] py-5 px-3 text-text-primary w-full text-sm"
              value={searchForm.specialization || ""}
              onChange={(e) =>
                setSearchForm({ ...searchForm, specialization: e.target.value })
              }
            />
            <SearchOutlinedIcon className="text-text-primary absolute right-2 top-2 " />

            <ToolTip
              message="Enter a specialization"
              show={showSpecializationTooltip}
            />
          </div>

          {/* button */}
          <button
            name="search-form-submit"
            title="search-form-submit"
            type="submit"
            disabled={
              searchForm.specialization === "" ||
              searchForm.specialization.toLowerCase() ===
                currentSpecialization.toLowerCase()
            }
            className={`mt-4 md:mt-0 md:ml-4 h-[41.33px] w-[150px] lg:w-[231px] text-sm ${
              searchForm.specialization === "" ||
              searchForm.specialization.toLowerCase() ===
                currentSpecialization.toLowerCase()
                ? "cursor-not-allowed bg-gray-300"
                : "cursor-pointer bg-primary "
            } rounded-md text-center text-white`}
          >
            Search
          </button>
        </form>
      </div>

      {/* SORT/FILTER */}
      <div className=" mt-8 flex items-center">
        {/* filter */}
        <div
          className=" w-[90px] md:w-[116px] h-[36px] bg-gray-100 border border-gray-200 rounded-md p-2 flex justify-between items-center text-sm cursor-pointer relative"
          onClick={() => setShowFilterOptions((prev) => !prev)}
        >
          <span className="text-text-primary md:text-base text-xs">
            {filterValue}
          </span>
          <ExpandMoreOutlinedIcon color="primary" />

          {showFilterOptions ? (
            <ul
              ref={optionsRef}
              className=" absolute left-0 -bottom-[40px] h-fit w-full bg-white shadow shadow-black/10"
            >
              {filterOptions.map((item, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-100 ${
                    filterValue === item.option
                      ? "text-primary bg-gray-100"
                      : " text-text-primary"
                  }`}
                  onClick={() => setFilterValue(item.option)}
                >
                  {item.option}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* sort */}
        <div className=" ml-8 md:ml-16 flex items-center">
          <p className=" text-text-primary text-xs md:text-sm mr-3">Sort By:</p>
          <div
            className=" w-[130px] md:w-[156px] h-[36px] bg-gray-100 border border-gray-200 rounded-md p-2 flex justify-between items-center text-sm cursor-pointer relative"
            onClick={() => setShowSortOptions((prev) => !prev)}
          >
            <span className="text-text-primary md:text-base text-xs">
              {sortBy}
            </span>
            <ExpandMoreOutlinedIcon color="primary" />

            {showSortOptions ? (
              <ul
                ref={sortRef}
                className=" absolute left-0 -bottom-[80px] h-fit w-full bg-white shadow shadow-black/10"
              >
                {sortOptions.map((item, index) => (
                  <li
                    key={index}
                    className={`p-2 hover:bg-gray-100 ${
                      sortBy === item.option
                        ? "text-primary bg-gray-100"
                        : " text-text-primary"
                    }`}
                    onClick={() => setSortBy(item.option)}
                  >
                    {item.option}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
