"use client";

import React, { useEffect, useState } from "react";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import Header from "../global/header/Header";
import LandingPageLoader from "../global/loaders/LandingPageLoader";
import { useFetchDoctor } from "@/hooks/useFetchDoctor";

type Props = {
  doctorId: string;
};

const Doctor = ({ doctorId }: Props) => {
  useFetchDoctor(doctorId);

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // slight loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mounted]);

  if (mounted) {
    if (loading) {
      return <LandingPageLoader />;
    }
  }

  return (
    <main>
      {/* Don't render Header until data is loaded */}
      {mounted && !loading && <Header activeIndex={-1} />}

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
