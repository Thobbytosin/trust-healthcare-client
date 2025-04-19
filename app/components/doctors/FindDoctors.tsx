"use client";
import React, { useEffect, useState } from "react";
import Header from "../global/Header";
import Doctors from "./Doctors";
import { useAuth } from "@/context/AuthContext";
import LandingPageLoader from "../home/LandingPageLoader";

type Props = {};

const FindDoctors = (props: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isLoading, refetchUser, user } = useAuth();

  useEffect(() => {
    setMounted(true);
    refetchUser(); // get latest user data
  }, []);

  if (mounted) {
    if (isLoading) {
      return <LandingPageLoader />;
    }
  }
  return (
    <main>
      {mounted && !isLoading && <Header activeIndex={2} />}

      <Doctors />
    </main>
  );
};

export default FindDoctors;
