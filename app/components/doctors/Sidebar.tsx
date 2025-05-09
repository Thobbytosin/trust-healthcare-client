"use client";

import { useFetchDoctors } from "@/hooks/useFetchDoctors";
import { useSearch } from "@/hooks/useSearch";
import useUserLocation from "@/hooks/useUserLocation";
import { IDoctor } from "@/types/doctor.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import ButtonLoader from "../global/loaders/ButtonLoader";

type Props = {
  doctorsData: IDoctor[];
};

const Sidebar: FC<Props> = ({ doctorsData }) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useFetchDoctors(queryParams);
  const { searchState, actions } = useSearch();
  const { userLocationSearched } = searchState;
  const { setUserLocationLoading, setUserLocationSearched } = actions;
  const { error, loading, location } = useUserLocation();
  const doctors = data?.doctors;
  const currentLocation = queryParams.get("location");
  const currentSearch = queryParams.get("search");

  // console.log("LOCATION LODADING:", loading);
  // console.log("LOCATION ERROR:", error);
  // console.log("LOCATION:", location);

  const handlePageParamsChange = (
    type: "location",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "location") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("location", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <aside className=" w-full min-h-fit  right-0 md:sticky -top-[100px]  ">
      <div className=" bg-white rounded-lg min-h-fit w-full mb-6 p-4">
        <h3 className=" text-text-primary font-medium text-xs lg:text-sm">
          Search by current location to see doctors near you
        </h3>
        {userLocationSearched && doctors && doctors.length ? (
          <p className=" font-light text-[#787887] text-xs mt-2">
            You are seeing results from{" "}
            <span className=" font-medium text-primary italic">{location}</span>
            :
          </p>
        ) : null}

        {/* // search results */}
        {userLocationSearched && !loading ? (
          doctors && doctors.length >= 1 ? (
            <p className="my-6 cursor-pointer font-normal text-xs bg-primary text-white block p-1">
              {doctors.length > 3
                ? `${doctors.length} or more doctors found`
                : `${doctors.length} ${
                    doctors.length > 1 ? "doctors" : "doctor"
                  } found`}
            </p>
          ) : (
            <p className="my-6 cursor-not-allowed font-normal text-xs bg-gray-200 text-text-primary block p-1">
              No doctor found
            </p>
          )
        ) : null}

        {error ? (
          <>
            <p className=" text-red-400 my-4 text-xs">{error}</p>
          </>
        ) : (
          <button
            type="button"
            disabled={loading || currentLocation !== null}
            onClick={() => {
              setUserLocationLoading(true);
              setTimeout(() => {
                handlePageParamsChange("location", location);
                setUserLocationLoading(false);
                setUserLocationSearched(true);
              }, 2000);
            }}
            className={` text-xs text-center lg:px-4 px-4 py-1 lg:py-1.5 rounded-full  flex justify-self-end ${
              !loading
                ? currentLocation === null &&
                  "cursor-pointer mt-6 bg-primary text-white hover:opacity-80 transition-all duration-500"
                : "cursor-not-allowed text-text-primary opacity-50 bg-transparent"
            }`}
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              currentLocation === null && "Yes, Search"
            )}
          </button>
        )}
      </div>

      <div className=" bg-white h-[300px] p-4 rounded-lg">
        <div className=" bg-white w-full h-full bg-[url(../public//assets/banner.jpg)] bg-cover bg-center bg-no-repeat "></div>
      </div>
    </aside>
  );
};

export default Sidebar;
