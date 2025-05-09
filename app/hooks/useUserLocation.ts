import { useEffect } from "react";
import { useSearch } from "./useSearch";
import { getCookie } from "@/utils/helpers";

export default function useUserLocation() {
  const { actions, searchState } = useSearch();
  const { setUserLocation, setUserLocationError, setUserLocationLoading } =
    actions;
  const { userLocation, userLocationLoading, userLocationError } = searchState;

  useEffect(() => {
    const consent = getCookie("cookie_consent") || "";
    const parsedConsents = JSON.parse(consent);

    const hasLocationConsent = parsedConsents?.location;

    if (!hasLocationConsent) {
      return setUserLocationError("Location permission denied");
    }

    const getLocation = async () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported on this browser");
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
          setUserLocationError(
            "Location permission denied or unavailable at the moment."
          );
          setUserLocationLoading(false);
        }
      );
    };

    getLocation();
  }, []);

  return {
    loading: userLocationLoading,
    location: userLocation,
    error: userLocationError,
  };
}
