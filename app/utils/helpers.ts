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

export function getNextSevenDays() {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    days.push({
      name: date.toLocaleDateString("en-Us", { weekday: "long" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      monthInteger: date.getMonth(),
      year: date.getFullYear(),
    });
  }

  return days;
}
