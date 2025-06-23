// lib/fetchUser.ts
import { SERVER_URI } from "@/config/api";
import { useServerStatusUniversal } from "@/hooks/useServerStausUniversal";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchDoctorsUnauth = async () => {
  const { isOnline } = await useServerStatusUniversal();

  if (!isOnline) return null;
  try {
    const cookieStore = await cookies();
    const consent = cookieStore.get("cookie_consent")?.value;

    const res = await axios.get(
      `${SERVER_URI}/doctor/doctors-list-unauthenticated`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-cookie-consent": consent || "",
        },
        withCredentials: true,
      }
    );

    return res.data.doctors;
  } catch (err: any) {
    console.log(
      "Error fetching doctors unauth:",
      err.response?.data || err.message
    );
    return null; // fallback to avoid crashing layout
  }
};
