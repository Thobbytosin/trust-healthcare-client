"use client";

import React, { useEffect, useState } from "react";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";

import Header from "../global/header/Header";

import { useFetchData } from "../../../app/hooks/useApi";
import { useAuth } from "../../../app/context/AuthContext";
import LandingPageLoader from "../home/LandingPageLoader";

type Props = {
  doctorId: string;
};

const Doctor = ({ doctorId }: Props) => {
  const { isLoading, refetchUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const {
    data: doctorData,
    isLoading: doctorLoading,
    isError,
    error,
    refetch: refetchDoctor,
  } = useFetchData({
    method: "GET",
    url: `/get-doctor/${doctorId}`,
    queryKey: [`${doctorId}`],
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);
    refetchDoctor(); // get latest doctor data
    refetchUser(); // get latest user data
  }, []);

  if (mounted) {
    if (isLoading || doctorLoading) {
      return <LandingPageLoader />;
    }
  }

  return (
    <main>
      {/* Don't render Header until data is loaded */}
      {mounted && !isLoading && !doctorLoading && <Header activeIndex={-1} />}

      <RevealWrapper key={"doctor"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
      </RevealWrapper>
    </main>
    // <section>
    //   <RevealWrapper key={"doctor"} variants={fadeInDown} animate>
    //     {/* blue header */}
    //     <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />

    //     <h1>Doctor Page</h1>
    //   </RevealWrapper>
    // </section>
  );
};

export default Doctor;
