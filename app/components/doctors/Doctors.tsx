"use client";

import React, { useState } from "react";
import DoctorsGrid from "./DoctorsGrid";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "../global/search/SearchHeader";
import SearchBanner from "../global/search/SearchBanner";
import { useFetchDoctors } from "@/hooks/useFetchDoctors";

type Props = {};

const Doctors = (props: Props) => {
  const queryParams = useSearchParams() || null;
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useFetchDoctors(queryParams);

  const handlePageParamsChange = (
    type: "filter" | "search" | "specialization" | "sortBy",
    parameter: any,
    defaultPageNum = 1
  ) => {
    let newParams = new URLSearchParams(queryParams?.toString());

    if (type === "filter") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("filter", parameter.toLowerCase());
    } else if (type === "search") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("search", parameter?.toLowerCase());
    } else if (type === "specialization") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("specialization", parameter?.toLowerCase());
    } else if (type === "sortBy") {
      newParams = new URLSearchParams();
      newParams.set("page", defaultPageNum.toString());
      newParams.set("sortBy", parameter?.toLowerCase());
    }

    router.push(`${pathname}?${newParams}`);
  };

  // for page change (PAGINATION)
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(queryParams?.toString());
    newParams.set("page", newPage.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <RevealWrapper key={"find-doctors"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />
        {/* SEARCH HEADER */}
        <SearchHeader
          key={"search-header"}
          handlePageParamsChange={handlePageParamsChange}
        />

        {/* display search info */}
        <SearchBanner key={"search-banner"} loading={isLoading} data={data} />

        {/* doctors data */}
        <div>
          <DoctorsGrid
            key={"doctors-grid"}
            loading={isLoading}
            handlePageChange={handlePageChange}
            data={data}
          />
        </div>
      </RevealWrapper>
    </section>
  );
};
export default Doctors;
