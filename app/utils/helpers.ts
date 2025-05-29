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

export function getDaysInAMonth(
  year: number,
  month: number,
  isCurrentMonth: boolean,
  doctorAvailableDays: string[]
) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const startDay = isCurrentMonth ? today.getDate() : 1;
  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
  const result: {
    date: number;
    dayName: string;
    fullDate: string;
    isAvailable: boolean;
  }[] = [];

  for (let day = startDay; day <= numberOfDaysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");

    result.push({
      date: day,
      dayName: daysOfWeek[dateObj.getDay()],
      fullDate: `${yyyy}-${mm}-${dd}`,
      isAvailable: doctorAvailableDays?.includes(daysOfWeek[dateObj.getDay()]),
    });
  }

  return result;
}

export function getFullDate(day: Date) {
  const yyyy = day.getFullYear();
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const dd = String(day.getDate()).padStart(2, "0");
  const fullDate = `${yyyy}-${mm}-${dd}`;

  return fullDate;
}

export function formattedDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const year = date.getFullYear(); // 2025

  return { day, month, dayOfWeek, year };
}
