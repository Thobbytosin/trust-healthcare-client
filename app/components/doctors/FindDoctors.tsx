"use client";
import React, { useEffect, useState } from "react";
import Header from "../global/header/Header";
import Doctors from "./Doctors";
import LandingPageLoader from "../home/LandingPageLoader";
import { useAuth } from "../../hooks/useAuth";

type Props = {};

const FindDoctors = (props: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isLoading: userLoading, refetch: refetchUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    refetchUser(); // get latest user data
  }, [mounted]);

  if (mounted) {
    if (userLoading) {
      return <LandingPageLoader />;
    }
  }
  return (
    <main>
      {mounted && !userLoading && <Header activeIndex={2} />}

      <Doctors />
    </main>
  );
};

export default FindDoctors;
