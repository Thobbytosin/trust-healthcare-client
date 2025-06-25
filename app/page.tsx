import LandingPageLoader from "@/components/loaders/LandingPageLoader";
import Home from "@/components/home/Home";
import { fetchDoctorsUnauth } from "@/lib/fetchDoctorsUnauth";
import { IDoctor } from "@/types/doctor.types";
import { Suspense } from "react";

export default async function LandingPage() {
  const doctors: IDoctor[] | null = await fetchDoctorsUnauth();

  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Home doctors={doctors} />
    </Suspense>
  );
}
