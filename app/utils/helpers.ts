import { useSearchReducer } from "../hooks/useSearchReducer";

export function getInitials(name: string) {
  if (!name) return "";

  const newNameArray = name.trim().split(" ");

  const initialsArray = newNameArray.map((n) => n.charAt(0).toUpperCase());

  if (initialsArray.length > 2) {
    initialsArray.pop();
    const initials = initialsArray.join("");
    return initials;
  } else {
    const initials = initialsArray.join("");
    return initials;
  }
}

export async function reverseGeocode(latitude: number, longitude: number) {
  const url = `${process.env.NEXT_PUBLIC_LOCATION_URL}?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "TrustHealthCare/1.0 (thobbytosin11@gmail.com)",
        "Accept-Language": "en", // Optional: for language preference
      },
    });
    const data = await response.json();

    // console.log("Reverse Geocode Data:", data);

    // const city =
    //   data.address.county ||
    //   data.address.city ||
    //   data.address.town ||
    //   data.address.village ||
    //   "Unknown";
    const location = data.display_name || "Unknown";

    return data.display_name || "Unknown";
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
}

export function fetchLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported on this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // get address
        const address = await reverseGeocode(latitude, longitude);
        resolve(address);
      },
      (error) => {
        console.log("Error getting Location:", error);
        reject(error);
      }
    );
  });
}
