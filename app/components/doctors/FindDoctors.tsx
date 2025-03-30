"use client";

import React, { useEffect, useMemo, useReducer, useState } from "react";
import DoctorsGrid from "./DoctorsGrid";
import RevealWrapper, { fadeInDown } from "../global/RevealWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DoneOutlinedIcon } from "../../icons/icons";

import SearchHeader from "../global/search/SearchHeader";
import Loader from "../global/Loader";
import { fetchLocation } from "../../../app/utils/helpers";
import { useDoctorsStore } from "../../../app/store/useDoctorsStore";
import { useFetchDoctors } from "../../../app/hooks/useFetchDoctors";

type Props = {};

export interface SearchForm {
  location?: string;
  parameter?: string;
}

// for search/fiter/sort
const initialState = {
  searchForm: { location: "", parameter: "" },
  locationSearched: false,
  showFilterOptions: false,
  showSortOptions: false,
  filterValue: "All",
  sortValue: "Latest",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_SEARCH_FORM":
      return {
        ...state,
        searchForm: { ...state.searchForm, ...action.payload },
      };

    case "SET_LOCATION_SEARCHED":
      return { ...state, locationSearched: action.payload };

    case "TOOGLE_FILTER_OPTIONS":
      return { ...state, showFilterOptions: !state.showFilterOptions };

    case "TOOGLE_SORT_OPTIONS":
      return { ...state, showSortOptions: !state.showSortOptions };

    case "SET_FILTER_VALUE":
      return { ...state, filterValue: action.payload };

    case "SET_SORT_VALUE":
      return { ...state, sortValue: action.payload };

    default:
      return state;
  }
};

const FindDoctors = (props: Props) => {
  const { refetch: refetchDoctors, isLoading: doctorsLoading } =
    useFetchDoctors();

  // refetch doctors data on page reload
  useEffect(() => {
    refetchDoctors();
  }, []);

  const doctors = useDoctorsStore((state) => state.doctors); // get doctors from the store

  // page states
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [activeSpecialization, setActiveSpecialization] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [location, setLocation] = useState<string | undefined>(undefined);

  useEffect(() => {
    // check if url has params
    const urlHasParams =
      params.get("filter") || params.get("keyword") || params.get("page");

    if (!urlHasParams) {
      const query = new URLSearchParams({
        filter: activeSpecialization.toLowerCase(),
        page: page.toString(),
        keyword: "doctors",
      });

      router.replace(`${pathname}?${query.toString()}`);
    }
  }, [router, params, pathname, activeSpecialization, page]);

  // memoized doctors data
  const doctorsDataMemo = useMemo(() => doctors || [], [doctors]); // updates only when the doctors change

  console.log(doctorsDataMemo);
  const handleFilterChange = (newFilter: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("filter", newFilter.toLowerCase());

    router.push(`${pathname}?${newParams}`);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", newPage.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  // location effect
  useEffect(() => {
    fetchLocation()
      .then((location: any) => {
        setLocation(location);
      })
      .catch((error) => {
        console.log("Error fetching location:", error);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-200">
      <RevealWrapper key={"find-doctors"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
        {/* SEARCH HEADER */}
        <SearchHeader
          key={"search-header"}
          filterValue={state.filterValue}
          searchForm={state.searchForm}
          setFilterValue={(value: any) =>
            dispatch({ type: "SET_FILTER_VALUE", payload: value })
          }
          setSearchForm={(value: any) =>
            dispatch({ type: "SET_SEARCH_FORM", payload: value })
          }
          setShowFilterOptions={() =>
            dispatch({ type: "TOOGLE_FILTER_OPTIONS" })
          }
          setShowSortOptions={() => dispatch({ type: "TOOGLE_SORT_OPTIONS" })}
          setSortValue={(value: any) =>
            dispatch({ type: "SET_SORT_VALUE", payload: value })
          }
          showFilterOptions={state.showFilterOptions}
          showSortOptions={state.showSortOptions}
          sortValue={state.sortValue}
        />

        {/* display search info */}

        <div className=" my-8 w-[90%] lg:w-[80%] mx-auto">
          <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
            Over 42 doctors available for you.
          </h2>
          <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
            <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
              <DoneOutlinedIcon fontSize="inherit" />
            </span>
            <span>
              Book appointments with minimum wait-time & verified doctor details
            </span>
          </p>
        </div>

        {/* doctors data */}
        <div>
          {/* {doctorsLoading && <Loader />} */}
          <DoctorsGrid
            loading={doctorsLoading}
            page={page}
            setPage={setPage}
            doctorsData={doctorsDataMemo}
            handlePageChange={handlePageChange}
            location={location}
            setActiveSpecialization={setActiveSpecialization}
            locationSearched={state.locationSearched}
            setLocationSearched={(value: any) => {
              dispatch({ type: "SET_LOCATION_SEARCHED", payload: value });
            }}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </RevealWrapper>
    </section>
  );
};
export default FindDoctors;
