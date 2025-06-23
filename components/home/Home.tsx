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
import { useServerStatus } from "@/hooks/useServerStatus";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/user.types";
import ServerStatusListener from "@/components/ui/ServerStatusListener";

type Props = {};

const Home = () => {
  // for protected route nextjs middleware
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { loading: doctorsLoading } = useFetchDoctorsFree();
  const [showConsent, setShowConsent] = useState(false);
  const doctors = useDoctorsStore((state) => state.doctors);
  const [shouldRender, setShouldRender] = useState(false);
  const { error: serverError, attempts } = useServerStatus({
    checkInterval: 10000,
  });

  // console.log("USER:", user);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined" && !doctorsLoading && !serverError) {
      setShouldRender(true);
    }
  }, [doctorsLoading]);

  useEffect(() => {
    if (!shouldRender) return;
    if (typeof window === "undefined") return;

    const consent = getCookie("cookie_consent");

    if (!consent) {
      setShowConsent(true);
      return;
    }
  }, [shouldRender]);

  // for middleware error
  useEffect(() => {
    if (!shouldRender) return;
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
  }, [shouldRender, searchParams, pathname]);

  if (serverError) {
    return <ServerStatusListener RETRY_INTERVAL={10000} attempts={attempts} />;
  }

  if (!shouldRender) {
    return <LandingPageLoader />;
  }

  return (
    <main>
      {/* Don't render Header until data is loaded */}
      <Header />

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
