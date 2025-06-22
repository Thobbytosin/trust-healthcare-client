import { SERVER_URI } from "@/config/api";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const cookieStore = await cookies();
  const consent = cookieStore.get("cookie_consent")?.value;
  const tr_host_x = cookieStore.get("tr_host_x")?.value;

  const res = await axios.get(SERVER_URI + "/auth/me", {
    headers: {
      Cookie: `tr_host_x=${tr_host_x}`,
      "Content-Type": "application/json",
      "x-cookie-consent": consent || "",
    },
  });

  return res.data.user;
};
