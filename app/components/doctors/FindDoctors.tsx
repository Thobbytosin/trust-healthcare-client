"use client";
import React, { useEffect, useState } from "react";
import Header from "../global/Header";
import Doctors from "./Doctors";
import { useAuth } from "@/context/AuthContext";
import LandingPageLoader from "../home/LandingPageLoader";
import { useFetchData } from "@/hooks/useApi";

type Props = {};

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
  const [mounted, setMounted] = useState<boolean>(false);
  const { isLoading, refetchUser, user } = useAuth();

  useEffect(() => {
    setMounted(true);
    refetchUser(); // get latest user data
  }, []);

  if (mounted) {
    if (isLoading) {
      return <LandingPageLoader />;
    }
  }
  return (
    <main>
      {mounted && !isLoading && <Header activeIndex={2} />}

      <Doctors />
    </main>
  );
};

export default FindDoctors;
