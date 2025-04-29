import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { ExpandMoreOutlinedIcon } from "../../../../app/icons/icons";
import { useSearchParams } from "next/navigation";
import useTooltip from "../../../hooks/useTooltip";
import debounce from "lodash.debounce";
import { SERVER_URI } from "../../../utils/uri";
import { SearchDoctorForm } from "../../../types/all.types";
import SelectLocation from "./SelectLocation";
import SpecializationForm from "./SpecializationForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

// sort options
const sortOptions = [
  { option: "Latest" },
  { option: "Ratings" },
  { option: "Oldest" },
];

type Props = {
  setSearchForm: (value: SearchDoctorForm) => void;
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
  handlePageParamsChange: (
    type: string,
    parameter: any,
    defaultPageNum?: number
  ) => any;
  setAllSuggestions: (value: []) => void;
  setShowSuggestionsList: (value: boolean) => void;
  allSuggestions: string[];
  showSuggestionList: boolean;
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
  handlePageParamsChange,
  setAllSuggestions,
  setShowSuggestionsList,
  allSuggestions,
  showSuggestionList,
}) => {
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLUListElement>(null);
  const sortRef = useRef<HTMLUListElement>(null);
  const params = useSearchParams();
  const showLocationTooltip = useTooltip("location-select");
  const showSpecializationTooltip = useTooltip("specialization");

  //   close suggestionlist, or sort or filter the drop down when clicking anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilterOptions(false);
      } else if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setShowSortOptions(false);
      } else if (
        suggestionListRef.current &&
        !suggestionListRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(async (term: string) => {
      try {
        const res = await fetch(
          `${SERVER_URI}/suggestion/fetch-suggestions?term=${term}`
        );
        const data = await res.json();

        setAllSuggestions(data.resultKeywords);
        setShowSuggestionsList(true);
      } catch (error) {
        console.log("Error fetching suggestions", error);
      }
    }, 500),
    []
  );

  // to fetchSuggestions
  useEffect(() => {
    if (
      searchForm.specialization.length &&
      searchForm.specialization.length > 2
    ) {
      fetchSuggestions(searchForm.specialization);
    } else {
      setAllSuggestions([]);
      setShowSuggestionsList(false);
    }
  }, [searchForm.specialization]);

  // search by specialization
  const handleSubmitSpecializationSearchForm = async (e: FormEvent) => {
    e.preventDefault();

    const currentSpecialization = params.get("specialization") || "";
    if (searchForm.specialization.trim() === "") return;

    if (
      searchForm.specialization.toLowerCase() ===
      currentSpecialization.toLowerCase()
    )
      return; // to avoid searching same location again

    setPage(1); // always set page to 1

    handlePageParamsChange("specialization", searchForm.specialization);

    setSearchTrigger(Date.now()); // to always trigger the useeffect

    // save to suggestions in the backend

    try {
      await fetch(`${SERVER_URI}/suggestion/save-suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchForm.specialization }),
      });

      setShowSuggestionsList(false);
    } catch (error) {
      console.error("Error saving suggestion", error);
    }
  };

  const currentSpecialization = params.get("specialization") || "";

  return (
    <div className=" bg-white w-[90%] lg:w-[80%] mx-auto -mt-[50px] shadow-md shadow-black/10 rounded-xl min-h-fit p-6">
      {/* SEARCH FORM */}
      <div className=" w-full md:flex justify-between  ">
        {/* location */}
        <SelectLocation
          key={"select-location"}
          handlePageParamsChange={handlePageParamsChange}
          searchForm={searchForm}
          setPage={setPage}
          setSearchForm={setSearchForm}
          setSearchTrigger={setSearchTrigger}
          showLocationTooltip={showLocationTooltip}
        />

        <SpecializationForm
          key={"specialization-search-form"}
          allSuggestions={allSuggestions}
          currentSpecialization={currentSpecialization}
          handleSubmit={handleSubmitSpecializationSearchForm}
          searchForm={searchForm}
          setSearchForm={setSearchForm}
          setShowSuggestionsList={setShowSuggestionsList}
          showSpecializationTooltip={showSpecializationTooltip}
          showSuggestionList={showSuggestionList}
          suggestionListRef={suggestionListRef}
        />
      </div>

      {/* SORT/FILTER */}
      <div className=" mt-8 flex items-center">
        {/* filter */}

        <div className=" flex items-center gap-4 ">
          <span className=" text-primary md:text-sm text-xs">Filter:</span>
          <div
            className=" w-[90px] md:w-[156px] h-[36px] bg-gray-100 border border-gray-200 rounded-md  flex justify-between items-center text-sm cursor-pointer relative"
            onClick={() => setShowFilterOptions((prev) => !prev)}
          >
            <Select
              // value={filterValue}
              onValueChange={(value: string) => {
                setFilterValue(value);

                setPage(1); // always set page to 1

                handlePageParamsChange("search", value);

                setSearchTrigger(Date.now()); // to always trigger the useeffect
              }}
            >
              <SelectTrigger
                id="filter"
                name="filter"
                aria-label="filter"
                data-testid="filter-doctors"
                disabled={filterValue.trim() !== ""}
                className="w-full h-full border-none py-5 focus:outline-0 focus:border-0 outline-none text-text-primary focus:outline-none ring-0 focus:ring-0  "
              >
                <SelectValue placeholder="Choose option" />
              </SelectTrigger>
              <SelectContent className=" mt-3 bg-white border-none text-text-primary">
                <SelectItem
                  value="All"
                  className=" transition-all duration-700 hover:bg-gray-200"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="Available"
                  className=" transition-all duration-700 hover:bg-gray-200"
                >
                  Available
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* sort */}
        <div className=" ml-8 md:ml-16 flex items-center gap-4">
          <p className=" text-primary md:text-sm text-xs">Sort By:</p>
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
                className=" ml-10 absolute left-0 -bottom-[80px] h-fit w-full bg-white shadow shadow-black/10"
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
