import { useCallback } from "react";
import { useSearch } from "./useSearch";
import { getCookie } from "@/utils/helpers";

export default function useUserLocation() {
  const { actions, searchState } = useSearch();
  const {
    setUserLocation,
    setUserLocationError,
    setUserLocationLoading,
    setUserLocationSearched,
  } = actions;
  const { userLocation, userLocationLoading, userLocationError } = searchState;

  const fetchUserLocation = useCallback(
    async (onSuccess?: (loc: string) => void) => {
      const consent = getCookie("cookie_consent") || "";
      const parsedConsents = JSON.parse(consent);

      const hasLocationConsent = parsedConsents?.location;

      if (!hasLocationConsent) {
        setUserLocationSearched(true);
        return setUserLocationError("Location permission denied");
      }

      if (!navigator.geolocation) {
        setUserLocationSearched(true);
        setUserLocationError("Geolocation is not supported on this browser");
        setUserLocationLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        // success
        async (positon) => {
          const { latitude, longitude } = positon.coords;

          try {
            const url = `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`;

            const res = await fetch(url);

            const data = await res.json();

            let userAproxLocation;

            if (res.ok) {
              // console.log(data?.results);
              userAproxLocation =
                data?.road + ", " + data?.town + ", " + data?.city;
              setUserLocation(userAproxLocation);
              onSuccess?.(userAproxLocation); // call this callback
            } else {
              setUserLocationError(data?.message);
            }
          } catch (error) {
            setUserLocationError("Network error while fetching location");
          } finally {
            setUserLocationLoading(false);
          }
        },

        // error
        (err) => {
          setUserLocationSearched(true);
          setUserLocationError(
            "Location permission denied or unavailable at the moment."
          );
          setUserLocationLoading(false);
        }
      );
    },
    []
  );

  return {
    fetchUserLocation,
    loading: userLocationLoading,
    location: userLocation,
    error: userLocationError,
  };
}
