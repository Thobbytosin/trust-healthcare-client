import LandingPageLoader from "@/components/global/loaders/LandingPageLoader";
import Home from "@/components/home/Home";
import { Suspense } from "react";

export default async function LandingPage() {
  return (
    <Suspense fallback={<LandingPageLoader />}>
      <Home />
    </Suspense>
  );
}
