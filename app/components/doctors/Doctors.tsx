"use client";

import React, { useEffect, useMemo, useState } from "react";
import DoctorsGrid from "./DoctorsGrid";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SearchHeader from "../global/search/SearchHeader";
import { useFetchData } from "../../hooks/useApi";
import SearchBanner from "../global/search/SearchBanner";
import { DoctorsBackendResponse } from "../../types/all.types";
import { useSearchReducer } from "../../hooks/useSearchReducer";

type Props = {};

const Doctors = (props: Props) => {
  // search states
  const { searchState, actions } = useSearchReducer();
  // page states
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [location, setLocation] = useState<string | undefined>(undefined);
  const [doctorsLoading, setDoctorsLoading] = useState<boolean>(false);

  const { data, refetch: refetchDoctors } =
    useFetchData<DoctorsBackendResponse>({
      method: "GET",
      url: `/doctor/get-all-doctors?page=${searchState.pageQuery}&search=${searchState.searchForm.location}&specialization=${searchState.searchForm.specialization}`,
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
  }, [searchState.pageQuery, searchState.searchTrigger]); // refetch doctors every time the page changes

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

  return (
    <section className="min-h-screen bg-gray-200">
      <RevealWrapper key={"find-doctors"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
        {/* SEARCH HEADER */}
        <SearchHeader
          key={"search-header"}
          filterValue={searchState.filterValue}
          handlePageParamsChange={handlePageParamsChange}
          searchForm={searchState.searchForm}
          allSuggestions={searchState.allSuggestions}
          setFilterValue={actions.setFilterValue}
          setSearchForm={actions.setSearchForm}
          setSearchTrigger={actions.setSearchTrigger}
          setShowFilterOptions={actions.toogleFilterOptions}
          setShowSortOptions={actions.toogleSortOptions}
          setSortBy={actions.setSortOption}
          setPage={actions.setPageQuery}
          setAllSuggestions={actions.setAllSuggestions}
          setShowSuggestionsList={actions.setShowSuggestionsList}
          showSuggestionList={searchState.showSuggestionList}
          showFilterOptions={searchState.showFilterOptions}
          showSortOptions={searchState.showSortOptions}
          sortBy={searchState.sortBy}
        />

        {/* display search info */}
        <SearchBanner
          key={"search-bannner"}
          currentLocation={currentLocation}
          currentSpecialization={currentSpecialization}
          defaultData={data}
          location={searchState.searchForm.location}
          resultsLength={doctorsDataMemo.length}
          specialization={searchState.searchForm.specialization}
          trigger={searchState.searchTrigger}
        />

        {/* doctors data */}
        <div>
          <DoctorsGrid
            loading={doctorsLoading}
            page={searchState.pageQuery}
            setPage={actions.setPageQuery}
            doctorsData={doctorsDataMemo}
            handlePageChange={handlePageChange}
            location={location}
            locationSearched={searchState.locationSearched}
            setLocationSearched={actions.setLocationSearched}
            handleFilterChange={handleFilterChange}
            totalDoctors={fetchtotalDoctors()}
            limit={data?.limit || 4}
            resetAll={actions.resetAll}
            setSearchTrigger={actions.setSearchTrigger}
          />
        </div>
      </RevealWrapper>
    </section>
  );
};
export default Doctors;
