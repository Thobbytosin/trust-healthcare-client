/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from "react";
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
  searchForm: object;
  setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSortOptions: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: string;
  showFilterOptions: boolean;
  setFilterValue: (value: string) => void;
  sortValue: string;
  showSortOptions: boolean;
  setSortValue: (value: string) => void;
};

const SearchHeader: FC<Props> = ({
  setSearchForm,
  searchForm,
  filterValue,
  setShowFilterOptions,
  showFilterOptions,
  setFilterValue,
  sortValue,
  showSortOptions,
  setSortValue,
  setShowSortOptions,
}) => {
  const optionsRef = useRef<HTMLUListElement>(null);
  const sortRef = useRef<HTMLUListElement>(null);

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

  return (
    <div className=" bg-white w-[90%] lg:w-[80%] mx-auto -mt-[50px] shadow-md shadow-black/10 rounded-xl min-h-fit p-6">
      {/* SEARCH FORM */}
      <form className=" w-full md:flex justify-between ">
        <div className=" md:flex">
          {/* location */}
          <div className=" relative w-full md:w-[190px] lg:w-[270px] h-fit  bg-gray-100  rounded-md">
            <Select
              onValueChange={(value: string) =>
                setSearchForm({ ...searchForm, location: value })
              }
            >
              <SelectTrigger className="w-full border border-gray-200 py-5 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0  ">
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
                  value="Ogun"
                  className=" transition-all duration-700 hover:bg-gray-200"
                >
                  Ogun
                </SelectItem>
                <SelectItem
                  value="Abuja"
                  className=" transition-all duration-700 hover:bg-gray-200"
                >
                  Abuja
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* doctor, hospital */}
          <div className="md:ml-4 mt-3 md:mt-0 relative w-full md:w-[250px] lg:w-[400px] bg-gray-100  border border-gray-200 rounded-md">
            <input
              type="text"
              placeholder="Search by Doctor, Hospital..."
              className=" outline-none bg-transparent h-[41.33px] py-5 px-3 text-text-primary w-full text-sm"
              onChange={(e) =>
                setSearchForm({ ...searchForm, parameter: e.target.value })
              }
            />
            <SearchOutlinedIcon className="text-text-primary absolute right-2 top-2 " />
          </div>
        </div>

        {/* button */}
        <button
          type="submit"
          className=" bg-primary mt-4 md:mt-0 h-[41.33px] w-[150px] lg:w-[231px] text-sm cursor-pointer rounded-md text-center text-white"
        >
          Search
        </button>
      </form>

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
              {sortValue}
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
                      sortValue === item.option
                        ? "text-primary bg-gray-100"
                        : " text-text-primary"
                    }`}
                    onClick={() => setSortValue(item.option)}
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
