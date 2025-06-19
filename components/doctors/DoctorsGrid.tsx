import React, { FC } from "react";
import DoctorCard from "./DoctorCard";
import Sidebar from "./Sidebar";
import DoctorCardSkeleton from "./DoctorsCardSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDoctor } from "@/types/doctor.types";
import { useSearch } from "@/hooks/useSearch";
import { useFetchDoctors } from "@/hooks/useFetchDoctors";
import Pagination from "./Pagination";

type Props = {};

const DoctorsGrid: FC<Props> = () => {
  const queryParams = useSearchParams();
  const { data, isLoading: loading } = useFetchDoctors(queryParams);

  const doctorsData: IDoctor[] = data?.doctors || [];
  const { actions } = useSearch();
  const { resetAll } = actions;

  const currentPage = queryParams?.get("page");
  const router = useRouter();
  const pathname = usePathname();

  // for page change (PAGINATION)
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(queryParams?.toString());
    newParams.set("page", newPage.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const clearAllQueryParams = () => {
    if (pathname) router.push(pathname); // removes all search/query params
  };

  const handleReset = () => {
    resetAll();
    clearAllQueryParams();
  };

  return (
    <section className=" w-[90%] lg:w-[80%] mx-auto flex flex-col md:flex-row gap-4 lg:gap-8 justify-between">
      <div className=" w-full md:w-[70%] h-fit">
        {/* load doctors data */}
        {loading
          ? [1, 2, 3, 4].map((_, index) => <DoctorCardSkeleton key={index} />)
          : doctorsData.map((doctor: any, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}

        {/* PAGINATION */}
        {!loading && doctorsData.length >= 1 ? (
          <Pagination
            key={"pagination"}
            currentPage={currentPage}
            data={data}
            handlePageChange={handlePageChange}
          />
        ) : (
          <button
            onClick={handleReset}
            className=" underline text-primary cursor-pointer"
          >
            See other doctors
          </button>
        )}
      </div>

      {/* SIDEBAR */}
      <div className=" w-full md:w-[30%] relative md:my-0 mb-12">
        <Sidebar />
      </div>
    </section>
  );
};

export default DoctorsGrid;
