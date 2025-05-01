import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import useTooltip from "../../../hooks/useTooltip";
import debounce from "lodash.debounce";
import { SERVER_URI } from "../../../utils/uri";
import { SearchDoctorForm } from "../../../types/all.types";
import SelectLocation from "./SelectLocation";
import SpecializationForm from "./SpecializationForm";
import FilterSearch from "./FilterSearch";
import SortSearch from "./SortSearch";

type Props = {
  setSearchForm: (value: SearchDoctorForm) => void;
  searchForm: SearchDoctorForm;
  filterValue: string | undefined;
  setFilterValue: (value: string) => void;
  setSearchTrigger: (value: number) => void;
  setPage: (value: number) => void;
  sortBy: string | undefined;
  setSortBy: (value: string) => void;
  handlePageParamsChange: (
    type: "filter" | "search" | "specialization" | "sortBy",
    parameter: any,
    defaultPageNum?: number
  ) => any;
  setAllSuggestions: (value: []) => void;
  setShowSuggestionsList: (value: boolean) => void;
  allSuggestions: string[];
  showSuggestionList: boolean;
  resetAll: () => void;
};

const SearchHeader: FC<Props> = ({
  setSearchForm,
  searchForm,
  filterValue,
  setSearchTrigger,
  setFilterValue,
  setPage,
  sortBy,
  setSortBy,
  handlePageParamsChange,
  setAllSuggestions,
  setShowSuggestionsList,
  allSuggestions,
  showSuggestionList,
  resetAll,
}) => {
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const params = useSearchParams();
  const showLocationTooltip = useTooltip("location-select");
  const showSpecializationTooltip = useTooltip("specialization");

  //   close suggestionlist, or sort or filter the drop down when clicking anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
      searchForm.specialization?.length &&
      searchForm.specialization?.length > 2
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
    if (searchForm.specialization?.trim() === "") return;

    if (
      searchForm.specialization?.toLowerCase() ===
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
      <div className=" mt-8 flex gap-10 md:gap-20 items-center">
        {/* filter */}
        <FilterSearch
          key={"filter-search"}
          filterValue={filterValue}
          handlePageParamsChange={handlePageParamsChange}
          resetAll={resetAll}
          setFilterValue={setFilterValue}
          setPage={setPage}
          setSearchTrigger={setSearchTrigger}
        />

        {/* sort */}
        <SortSearch
          key={"sort-search"}
          setPage={setPage}
          setSearchTrigger={setSearchTrigger}
          handlePageParamsChange={handlePageParamsChange}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
