"use client";
import { useAuth } from "../../../app/context/AuthContext";
import React, { useEffect, useState } from "react";
import Header from "../global/Header";
import Hero from "./Hero";
import Search from "../global/search/Search";
import CookiesConsent from "../cookieconsent/CookiesConsent";
import Footer from "../global/Footer";
import NewsLetter from "./NewsLetter";
import VideoSection from "./VideoSection";
import Testimonials from "./Testimonials";
import MeetDoctors from "./MeetDoctors";
import Services from "./Services";
import { useFetchDoctors } from "../../../app/hooks/useFetchDoctors";
import { useDoctorsStore } from "@/store/useDoctorsStore";
import LandingPageLoader from "./LandingPageLoader";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Props = {};

const Home = (props: Props) => {
  const { isLoading, refetchUser, user } = useAuth();
  const { isLoading: doctorsLoading, refetch: refetchDoctors } =
    useFetchDoctors();
  const doctors = useDoctorsStore((state) => state.doctorsFree);

  const [mounted, setMounted] = useState(false);

  // for protected route nextjs middleware
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (typeof window === "undefined") return;

    const consent = localStorage.getItem("cookie_consent");

    if (!consent) return;

    const timeout = setTimeout(() => {
      refetchDoctors();
      refetchUser();
    }, 100);

    return () => clearTimeout(timeout);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (searchParams.get("authError") === "true") {
      toast.error("You are not logged in", {
        description: "Sign in to proceed. Thanks",
        duration: 4000,
      });

      // Remove the authError param from the URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("authError");

      // const newUrl = `${pathname}?${newParams.toString()}`;
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, pathname]);

  if (mounted) {
    if (isLoading || doctorsLoading) {
      return <LandingPageLoader />;
    }
  }

  return (
    <main>
      {/* Don't render Header until data is loaded */}
      {mounted && !isLoading && !doctorsLoading && <Header />}

      <Hero />

      <Search />

      <Services />

      <MeetDoctors doctors={doctors} />

      <Testimonials />

      <VideoSection />

      <NewsLetter />

      <Footer />

      {/* cookies consent */}
      <CookiesConsent />
    </main>
  );
};

export default Home;
