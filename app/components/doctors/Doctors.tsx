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
  grandTotalDoctors: number;
  limit: number;
}

export interface SearchDoctorForm {
  location: string;
  specialization: string;
}

// for search/fiter/sort
const initialState = {
  searchForm: { location: "", specialization: "" },
  locationSearched: false,
  showFilterOptions: false,
  showSortOptions: false,
  filterValue: "All",
  sortBy: "Latest",
  searchQuery: "",
  pageQuery: 1,
  availableQuery: null,
  searchTrigger: 0,
  allSpecializations: [],
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

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_PAGE_QUERY":
      return { ...state, pageQuery: action.payload };
    case "SET_AVAILABLE_QUERY":
      return { ...state, availableQuery: action.payload };
    case "SET_SEARCH_TRIGGER":
      return { ...state, searchTrigger: action.payload };

    case "RESET_SEARCH_FORM":
      return { ...state, searchForm: { location: "", specialization: "" } };

    case "SET_ALL_SPECIALIZATIONS":
      return { ...state, allSpecializations: action.payload };

    case "ADD_SPECIALIZATION":
      if (state.allSpecializations.includes(action.payload)) {
        return state; // return if category exists in the array
      }
      const updatedList = [...state.allSpecializations, action.payload];
    // localStorage.setItem('specializations')

    case "RESET_ALL":
      return initialState;

    default:
      return state;
  }
};

const Doctors = (props: Props) => {
  // page states
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [doctorsLoading, setDoctorsLoading] = useState<boolean>(false);

  const {
    data,
    // isLoading: doctorsLoading,
    error,
    refetch: refetchDoctors,
  } = useFetchData<DoctorsBackendResponse>({
    method: "GET",
    url: `/doctor/get-all-doctors?page=${state.pageQuery}&search=${state.searchForm.location}&specialization=${state.searchForm.specialization}`,
    queryKey: ["doctors"],
    enabled: false,
  });

  useEffect(() => {
    setDoctorsLoading(true);
    refetchDoctors();

    const timer = setTimeout(() => {
      setDoctorsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [state.pageQuery, state.searchTrigger]); // refetch doctors every time the page changes

  // memoized doctors data
  const doctorsDataMemo = useMemo(() => data?.doctors || [], [data?.doctors]); // updates only when the doctors change

  const handlePageParamsChange = (
    type: string,
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(params.toString());

    if (type === "filter") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("filter", parameter.toLowerCase());
    } else if (type === "search") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("search", parameter.toLowerCase());
    } else if (type === "specialization") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("specialization", parameter.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  const handleFilterChange = (newFilter: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("filter", newFilter.toLowerCase());
    router.push(`${pathname}?${newParams}`);
  };

  // const handleSearchChange = (newFilter: string, defaultPageNum = 1) => {
  //   const newParams = new URLSearchParams(params.toString());
  //   newParams.set("search", newFilter.toLowerCase());
  //   newParams.set("page", defaultPageNum.toString());

  //   router.push(`${pathname}?${newParams}`);
  // };

  // for page chnage
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", newPage.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  // page params
  const fetchtotalDoctors = () => {
    if (params.has("search") || params.has("specialization")) {
      return doctorsDataMemo.length;
    } else {
      return data?.grandTotalDoctors || 0;
    }
  };

  const currentLocation = params.get("search") || "";
  const currentSpecialization = params.get("specialization") || "";

  // location effect
  // useEffect(() => {
  //   fetchLocation()
  //     .then((location: any) => {
  //       setLocation(location);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching location:", error);
  //     });
  // }, []);

  // console.log(state);
  // console.log(state.searchTrigger);

  return (
    <section className="min-h-screen bg-gray-200">
      <RevealWrapper key={"find-doctors"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
        {/* SEARCH HEADER */}
        <SearchHeader
          key={"search-header"}
          filterValue={state.filterValue}
          handleSearchChange={handlePageParamsChange}
          searchForm={state.searchForm}
          setFilterValue={(value: any) =>
            dispatch({ type: "SET_FILTER_VALUE", payload: value })
          }
          setSearchForm={(value: any) =>
            dispatch({ type: "SET_SEARCH_FORM", payload: value })
          }
          setSearchTrigger={(value: number) =>
            dispatch({ type: "SET_SEARCH_TRIGGER", payload: value })
          }
          setShowFilterOptions={() =>
            dispatch({ type: "TOOGLE_FILTER_OPTIONS" })
          }
          setShowSortOptions={() => dispatch({ type: "TOOGLE_SORT_OPTIONS" })}
          setSortBy={(value: any) =>
            dispatch({ type: "SET_SORT_BY", payload: value })
          }
          setPage={(value: number) => {
            dispatch({ type: "SET_PAGE_QUERY", payload: value });
          }}
          showFilterOptions={state.showFilterOptions}
          showSortOptions={state.showSortOptions}
          sortBy={state.sortBy}
        />

        {/* display search info */}

        <div className=" my-8 w-[90%] lg:w-[80%] mx-auto">
          {/* for search results */}
          {state.searchTrigger &&
          state.searchForm.location !== "" &&
          state.searchForm.location.toLowerCase() ===
            currentLocation.toLowerCase() ? (
            doctorsDataMemo.length >= 1 ? (
              <>
                <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                  Great!{" "}
                  <span className=" text-primary">
                    {doctorsDataMemo.length}
                  </span>{" "}
                  <span className=" text-primary">
                    {doctorsDataMemo.length > 1 ? "doctors" : "doctor"}
                  </span>{" "}
                  found in{" "}
                  <span className=" text-primary capitalize">
                    {state.searchForm.location}
                  </span>{" "}
                  available for you.
                </h2>
                <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
                  <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                    <DoneOutlinedIcon fontSize="inherit" />
                  </span>
                  <span>
                    Book appointments with minimum wait-time & verified doctor
                    details
                  </span>
                </p>
              </>
            ) : (
              state.searchForm.location.toLowerCase() ===
                currentLocation.toLowerCase() && (
                <>
                  <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                    Sorry! No doctor found in{" "}
                    <span className=" text-red-500 capitalize">
                      {state.searchForm.location}
                    </span>{" "}
                    at this time.
                  </h2>
                </>
              )
            )
          ) : null}

          {/* for specialization results */}
          {state.searchTrigger &&
          state.searchForm.specialization !== "" &&
          state.searchForm.specialization.toLowerCase() ===
            currentSpecialization.toLowerCase() ? (
            doctorsDataMemo.length >= 1 ? (
              <>
                <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                  Great!{" "}
                  <span className=" text-primary">
                    {doctorsDataMemo.length}
                  </span>{" "}
                  <span className=" text-primary">
                    {doctorsDataMemo.length > 1 ? "doctors" : "doctor"}
                  </span>{" "}
                  specialized in{" "}
                  <span className=" text-primary capitalize">
                    {state.searchForm.specialization}
                  </span>{" "}
                  available for you.
                </h2>
                <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
                  <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                    <DoneOutlinedIcon fontSize="inherit" />
                  </span>
                  <span>
                    Book appointments with minimum wait-time & verified doctor
                    details
                  </span>
                </p>
              </>
            ) : (
              state.searchForm.specialization.toLowerCase() ===
                currentSpecialization.toLowerCase() && (
                <>
                  <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                    Sorry! No registered doctor specialized in{" "}
                    <span className=" text-red-500 capitalize">
                      {state.searchForm.specialization}
                    </span>{" "}
                    yet at this time.
                  </h2>
                </>
              )
            )
          ) : null}

          {/* default text */}
          {state.searchTrigger === 0 ? (
            <>
              <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
                Over {(data?.grandTotalDoctors || 30) - 1} doctors available for
                you.
              </h2>
              <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
                <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
                  <DoneOutlinedIcon fontSize="inherit" />
                </span>
                <span>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </span>
              </p>
            </>
          ) : null}
        </div>

        {/* doctors data */}
        <div>
          {/* {doctorsLoading && <Loader />} */}
          <DoctorsGrid
            loading={doctorsLoading}
            page={state.pageQuery}
            setPage={(value: number) => {
              dispatch({ type: "SET_PAGE_QUERY", payload: value });
            }}
            doctorsData={doctorsDataMemo}
            handlePageChange={handlePageChange}
            location={location}
            locationSearched={state.locationSearched}
            setLocationSearched={(value: any) => {
              dispatch({ type: "SET_LOCATION_SEARCHED", payload: value });
            }}
            handleFilterChange={handleFilterChange}
            totalDoctors={fetchtotalDoctors()}
            limit={data?.limit || 4}
            dispatch={dispatch}
            setSearchTrigger={(value: number) =>
              dispatch({ type: "SET_SEARCH_TRIGGER", payload: value })
            }
          />
        </div>
      </RevealWrapper>
    </section>
  );
};
export default Doctors;
