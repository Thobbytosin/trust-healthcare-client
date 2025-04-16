"use client";

import React, { useEffect, useMemo, useReducer, useState } from "react";
import DoctorsGrid from "./DoctorsGrid";
import RevealWrapper, { fadeInDown } from "../global/RevealWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DoneOutlinedIcon } from "../../icons/icons";

import SearchHeader from "../global/search/SearchHeader";
import Loader from "../global/Loader";
import { fetchLocation } from "../../utils/helpers";
import { useDoctorsStore } from "../../store/useDoctorsStore";
import { useFetchDoctors } from "../../hooks/useFetchDoctors";
import { useFetchData } from "@/hooks/useApi";

type Props = {};

// backend response type
interface DoctorsBackendResponse {
  success: boolean;
  message: string;
  doctors: any[];
  resultsPerPage: number;
  totalPages: number;
  page: number;
}

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

const Doctors = (props: Props) => {
  // page states
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [page, setPage] = useState<number>(2);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const {
    data,
    isLoading: doctorsLoading,
    error,
    refetch: refetchDoctors,
  } = useFetchData<DoctorsBackendResponse>({
    method: "GET",
    url: `/get-all-doctors?page=${page}`,
    queryKey: ["doctors"],
    enabled: false,
  });

  useEffect(() => {
    refetchDoctors();
  }, []);

  // memoized doctors data
  const doctorsDataMemo = useMemo(() => data?.doctors || [], [data?.doctors]); // updates only when the doctors change

  // console.log(doctorsDataMemo);

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
export default Doctors;
