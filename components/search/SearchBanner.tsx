import { useSearch } from "@/hooks/useSearch";
import { DoneOutlinedIcon } from "@/icons/icons";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useFetchDoctors } from "@/hooks/useFetchDoctors";
import LocationBanner from "@/components/ui/banners/location/LocationBanner";
import LocationBannerError from "@/components/ui/banners/location/LocationBannerError";
import UserLocationBannerError from "@/components/ui/banners/userlocation/UserLocationBannerError";
import UserLocationBanner from "@/components/ui/banners/userlocation/UserLocationBanner";
import SpecialtyBannerError from "@/components/ui/banners/specialty/SpecialtyBannerError";
import SpecialtyBanner from "@/components/ui/banners/specialty/SpecialtyBanner";
import FilterBanner from "@/components/ui/banners/filter/FilterBanner";
import FilterBannerError from "@/components/ui/banners/filter/FilterBannerError";
import { fetchMatchedSpecialization } from "@/utils/helpers";

type Props = {};

const SearchBanner = (props: Props) => {
  const params = useSearchParams();
  const { data, isLoading: loading } = useFetchDoctors(params);
  const resultsLength = data?.doctors?.length || 0;

  const currentSearch = params.get("search");
  const currentLocation = params.get("location");
  const currentSpecialization = params.get("specialization");
  const currentFilterValue = params.get("filter");

  const { searchState } = useSearch();
  const { searchForm, filterValue, typingTrigger, userLocation } = searchState;
  const { location, specialization } = searchForm;

  // useful when specialization has more than a word
  const matchedSpecialization = fetchMatchedSpecialization(
    data,
    currentSpecialization
  );

  if (loading)
    return (
      <div className="my-8 w-[90%] lg:w-[80%] mx-auto">
        <div className="h-[100px] w-[70%] animate-pulse bg-gray-300/50 overflow-clip rounded-xl" />
      </div>
    );

  return (
    <div className=" my-8 w-[90%] lg:w-[80%] mx-auto font-poppins">
      {/* for location results */}
      {!typingTrigger && currentSearch && location?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <LocationBanner
            key={"location-banner"}
            currentSearch={currentSearch}
            resultsLength={resultsLength}
          />
        ) : (
          <LocationBannerError
            key={"location-banner-error"}
            location={location || currentSearch}
          />
        )
      ) : null}

      {/* for user location results */}
      {!typingTrigger && currentLocation && userLocation?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <UserLocationBanner results={resultsLength} />
        ) : (
          <UserLocationBannerError />
        )
      ) : null}

      {/* for specialization results */}
      {!typingTrigger &&
      currentSpecialization &&
      specialization?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <SpecialtyBanner
            currentSpecialization={matchedSpecialization}
            results={resultsLength}
          />
        ) : (
          <SpecialtyBannerError specialization={specialization} />
        )
      ) : null}

      {/* for filter results */}
      {!typingTrigger && currentFilterValue && filterValue?.trim() !== "" ? (
        resultsLength >= 1 ? (
          <FilterBanner results={resultsLength} />
        ) : (
          <FilterBannerError />
        )
      ) : null}

      {/* default text */}
      {!typingTrigger &&
      currentSpecialization === null &&
      currentSearch === null &&
      currentLocation === null &&
      currentFilterValue === null ? (
        <>
          <h2 className=" text-text-primary text-center md:text-left text-lg md:text-xl font-medium">
            Verified doctors available for you.
          </h2>
          <p className="text-[#787887] max-w-[80%] md:min-w-full mx-auto  md:text-left text-center font-light mt-1 text-xs md:text-sm flex items-center gap-2">
            <span className="hidden md:w-[18px] md:h-[18px] rounded-full border border-[#787887] text-xs md:text-sm md:flex justify-center items-center">
              <DoneOutlinedIcon fontSize="inherit" />
            </span>
            <span>
              Book appointments with minimum wait-time & verified doctor details
            </span>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SearchBanner;
