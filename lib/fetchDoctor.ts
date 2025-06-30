// lib/fetchUser.ts
import { SERVER_URI } from "@/config/api";
import { useServerStatusUniversal } from "@/hooks/useServerStausUniversal";
import { IDoctorResponse } from "@/types/doctor.types";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchDoctor = async (doctorId: string) => {
  const { isOnline } = await useServerStatusUniversal();

  if (!isOnline) return null;

  try {
    const cookieStore = await cookies();
    const consent = cookieStore.get("cookie_consent")?.value;
    const tr_host_x = cookieStore.get("TR_HOST_X")?.value;

    if (!consent) return null;

    const res = await axios.get(`${SERVER_URI}/doctor/get-doctor/${doctorId}`, {
      headers: {
        Cookie: `tr_host_x=${tr_host_x}`,
        "Content-Type": "application/json",
        "x-cookie-consent": consent || "",
      },
      withCredentials: true,
    });

    const formattedRes: IDoctorResponse = res.data;

    return formattedRes.data;
  } catch (err: any) {
    console.log("Error fetching doctor:", err.response?.data || err.message);
    return null; // fallback to avoid crashing layout
  }
};
