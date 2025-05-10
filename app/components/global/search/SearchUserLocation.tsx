import { useFetchDoctors } from "@/hooks/useFetchDoctors";
import { useSearch } from "@/hooks/useSearch";
import useUserLocation from "@/hooks/useUserLocation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ButtonLoader from "../loaders/ButtonLoader";

type Props = {
  mobile?: boolean;
};

const SearchUserLocation = ({ mobile }: Props) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useFetchDoctors(queryParams);
  const { searchState, actions } = useSearch();
  const { userLocationSearched } = searchState;
  const { setUserLocationLoading, setUserLocationSearched, setUserLocation } =
    actions;
  const { fetchUserLocation, error, loading, location } = useUserLocation();
  const doctors = data?.doctors;
  const currentLocation = queryParams.get("location");

  // reset when page loads
  useEffect(() => {
    setUserLocation("none");
    setUserLocationLoading(false);
    setUserLocationSearched(false);
  }, []);

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
    <div
      className={`${
        mobile ? "bg-gray-200 mt-8" : "bg-white mb-6"
      } rounded-lg min-h-fit w-full  p-4`}
    >
      <h3 className=" text-text-primary font-medium text-xs lg:text-sm">
        Search by current location to see doctors near you
      </h3>

      {/* when there is no doctor */}
      {currentLocation &&
        !loading &&
        userLocationSearched &&
        Array.isArray(doctors) &&
        doctors.length === 0 && (
          <p
            className={`mt-6 cursor-not-allowed font-normal text-xs ${
              mobile ? "bg-white" : "bg-gray-200"
            } text-text-primary block p-1`}
          >
            No doctor found
          </p>
        )}

      {/* when there is a doctor  */}
      {currentLocation &&
        !loading &&
        userLocationSearched &&
        Array.isArray(doctors) &&
        doctors.length >= 1 && (
          <>
            <p className=" font-light text-[#787887] text-xs mt-2">
              You are seeing results around{" "}
              <span className=" font-medium text-primary italic">
                {location}
              </span>
              :
            </p>

            <p className="mt-6 cursor-pointer font-normal text-xs bg-primary text-white block p-1">
              {doctors.length > 3
                ? `${doctors.length} or more doctors found`
                : `${doctors.length} ${
                    doctors.length > 1 ? "doctors" : "doctor"
                  } found`}
            </p>
          </>
        )}

      {userLocationSearched && error && (
        <>
          <p className=" text-red-400 my-4 text-xs">{error}</p>
        </>
      )}

      {!userLocationSearched && (
        <button
          type="button"
          disabled={loading || currentLocation !== null}
          onClick={() => {
            setUserLocationLoading(true);

            fetchUserLocation((newLocation) => {
              handlePageParamsChange("location", newLocation);
              setUserLocationSearched(true);
            });
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
  );
};

export default SearchUserLocation;
