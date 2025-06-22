import LandingPageLoader from "@/components/global/loaders/LandingPageLoader";
import Home from "@/components/home/Home";
import { SERVER_URI } from "@/config/api";
import { fetchUser } from "@/lib/fetchUser";
import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";

// const refreshTokens = async () => {
//   const cookieStore = await cookies();
//   const consent = cookieStore.get("cookie_consent")?.value;
//   const tc_agent_x = cookieStore.get("tc_agent_x")?.value;

//   const ref = await axios.get(`${SERVER_URI}/auth/refresh-tokens`, {
//     headers: {
//       Cookie: `tc_agent_x=${tc_agent_x}`,
//       "Content-Type": "application/json",
//       "x-cookie-consent": consent || "",
//     },
//     withCredentials: true,
//   });

//   console.log(ref.data);

//   try {
//     const user = await fetchUser();
//     return user;
//   } catch (err) {
//     console.error("Failed to fetch user:", err);
//     return null;
//   }
// };

export default async function LandingPage() {
  // const user = await refreshTokens();
  // console.log("PAGE", user);
  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Home />
    </Suspense>
  );
}
