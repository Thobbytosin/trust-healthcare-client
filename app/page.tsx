import LandingPageLoader from "@/components/loaders/LandingPageLoader";
import Home from "@/components/home/Home";
import { fetchDoctorsUnauth } from "@/lib/fetchDoctorsUnauth";
import { Suspense } from "react";
import { TDoctor } from "@/types/doctor.types";

export default async function LandingPage() {
  const doctors: TDoctor[] | null = await fetchDoctorsUnauth();

  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Home doctors={doctors} />
    </Suspense>
  );
}
