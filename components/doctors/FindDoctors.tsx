"use client";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Doctors from "./Doctors";
import LandingPageLoader from "../loaders/LandingPageLoader";
import { useFetchDoctors } from "@/hooks/useFetchDoctors";

type Props = {};

const FindDoctors = (props: Props) => {
  const { isLoading: loading } = useFetchDoctors(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return <LandingPageLoader />;
  }

  return (
    <main>
      {!loading && <Header activeIndex={2} />}

      <Doctors />
    </main>
  );
};

export default FindDoctors;
