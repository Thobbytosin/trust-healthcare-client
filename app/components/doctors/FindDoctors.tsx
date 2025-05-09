"use client";
import React, { useEffect, useState } from "react";
import Header from "../global/header/Header";
import Doctors from "./Doctors";
import LandingPageLoader from "../global/loaders/LandingPageLoader";

type Props = {};

const FindDoctors = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
