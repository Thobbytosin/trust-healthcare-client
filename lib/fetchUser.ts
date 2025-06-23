// lib/fetchUser.ts
import { SERVER_URI } from "@/config/api";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  try {
    const cookieStore = await cookies();
    const consent = cookieStore.get("cookie_consent")?.value;
    const tr_host_x = cookieStore.get("TR_HOST_X")?.value;

    const res = await axios.get(`${SERVER_URI}/user/me`, {
      headers: {
        Cookie: `tr_host_x=${tr_host_x}`,
        "Content-Type": "application/json",
        "x-cookie-consent": consent || "",
      },
      withCredentials: true,
    });

    console.log(res.data.user);
    return res.data.user;
  } catch (err: any) {
    console.log("Error fetching user:", err.response?.data || err.message);
    return null; // fallback to avoid crashing layout
  }
};
