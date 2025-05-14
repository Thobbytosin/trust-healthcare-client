import { DoctorsBackendResponse } from "@/types/doctor.types";

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

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length >= 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }

  return undefined;
}

export function getAccessToken(name: string): string | undefined {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length >= 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }

  return undefined;
}

export function fetchMatchedSpecialization(
  data: DoctorsBackendResponse | undefined,
  currentSpecialization: string | null
) {
  // compare specialization values
  const dataResultArray = data?.doctors?.flatMap((d) => d.specialization);
  const queryArray = currentSpecialization?.split(" ");

  // convert to lowercase
  const dataResultArrayLower = dataResultArray?.map((item) =>
    item.toLowerCase()
  );
  const queryArrayLower = queryArray?.map((item) => item.toLowerCase());

  // find matched value
  const matchedSpecialalization = queryArrayLower?.find((item) =>
    dataResultArrayLower?.includes(item)
  );

  return matchedSpecialalization || null;
}

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
