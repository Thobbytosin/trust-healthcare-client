"use client";

import React, { useEffect, useState } from "react";
import Header from "../global/header/Header";
import Hero from "./Hero";
import Search from "../global/search/Search";
import CookiesConsent from "../cookieconsent/CookiesConsent";
import Footer from "../global/footer/Footer";
import { useDoctorsStore } from "@/store/useDoctorsStore";
import LandingPageLoader from "../global/loaders/LandingPageLoader";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getCookie } from "@/utils/helpers";
import LazyLoad from "../global/lazyLoad/LazyLoad";
import Services from "./Services";
import { useFetchDoctorsFree } from "@/hooks/useFetchDoctorsFree";
import AiChatWidget from "../ai/AiChatWidget";
import ButtonLoader from "../global/loaders/ButtonLoader";
import SectionLoader from "../global/loaders/SectionLoader";
import NewsLetter from "./NewsLetter";

type Props = {};

const Home = (props: Props) => {
  // for protected route nextjs middleware
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { loading: doctorsLoading } = useFetchDoctorsFree();
  const [showConsent, setShowConsent] = useState(false);
  const doctors = useDoctorsStore((state) => state.doctors);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === "undefined") return;

    const consent = getCookie("cookie_consent");

    if (!consent) {
      setShowConsent(true);
      return;
    }
  }, [isMounted]);

  // for middleware error
  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === "undefined") return;

    if (searchParams.get("authError") === "true") {
      toast.error("Session has expired", {
        description: "You are not currently logged in.",
        duration: 4000,
      });

      // Remove the authError param from the URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("authError");

      // const newUrl = `${pathname}?${newParams.toString()}`;
      window.history.replaceState({}, "", "/");
    }
  }, [isMounted, searchParams, pathname]);

  if (!isMounted) return null;

  if (doctorsLoading) {
    return <LandingPageLoader />;
  }

  return (
    <main>
      {/* Don't render Header until data is loaded */}
      {!doctorsLoading && <Header />}

      <Hero />

      <Search />

      <Services />

      <LazyLoad
        importFunc={() => import("./MeetDoctors")}
        props={{ doctors }}
        placeholder={<SectionLoader />}
      />

      <LazyLoad
        importFunc={() => import("./Testimonials")}
        placeholder={<SectionLoader />}
      />

      <LazyLoad
        importFunc={() => import("./VideoSection")}
        placeholder={<SectionLoader />}
      />

      <NewsLetter />

      <Footer />

      <AiChatWidget />

      {/* cookies consent */}
      {showConsent && <CookiesConsent setShowConsent={setShowConsent} />}
    </main>
  );
};

export default Home;
