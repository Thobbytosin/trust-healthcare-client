"use client";

import React, { useEffect, useState } from "react";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import Header from "../global/header/Header";
import LandingPageLoader from "../global/loaders/LandingPageLoader";
import { useFetchDoctor } from "@/hooks/useFetchDoctor";
import { styles } from "@/styles/styles";
import { useDoctorsStore } from "@/store/useDoctorsStore";
import Image from "next/image";
import banner from "../../../public/assets/header-banner.png";
import { VerifiedIcon, WorkspacePremiumIcon } from "@/icons/icons";
import Ratings from "../ui/Ratings";

type Props = {
  doctorId: string;
};

const Doctor = ({ doctorId }: Props) => {
  const { loading } = useFetchDoctor(doctorId);
  const [mounted, setMounted] = useState(false);
  const doctor = useDoctorsStore((state) => state.doctor);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (Object.keys(doctor).length === 0 || loading) {
    return <LandingPageLoader />;
  }

  console.log(doctor);

  return (
    <main className=" min-h-screen bg-gray-200 pb-20">
      {/* Don't render Header until data is loaded */}
      {!loading && <Header activeIndex={-1} />}

      <RevealWrapper key={"doctor"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />

        <div
          className={`${styles.paddingX} -mt-[50px] w-full flex gap-8 items-start justify-between`}
        >
          <section
            className={`w-[60%] h-fit ${styles.paddingBottom} bg-white rounded-2xl`}
          >
            {/* header banner */}
            <div className=" relative w-full h-[200px] rounded-t-2xl overflow-clip">
              <Image
                src={banner}
                alt="doctor_banner"
                fill
                className=" object-cover"
              />
            </div>

            {/* doctor profile */}
            {/* avatar */}
            <div className=" absolute left-[5rem] -mt-20 z-10">
              <div className=" relative  rounded-full w-40 h-40 bg-gray-100 border-4 border-white overflow-hidden">
                <Image
                  src={doctor.image}
                  alt="doctor_image"
                  fill
                  className=" object-contain"
                />
              </div>
            </div>

            {/* content */}
            <div>
              <div className="  flex flex-col space-y-2  mt-10 ml-50">
                {/* name */}
                <h2 className=" text-2xl font-semibold">
                  {doctor.name}

                  <span className=" ml-2  italic font-normal  text-xl text-primary">
                    {doctor.verificationStatus === "Verified" ? (
                      <>
                        <VerifiedIcon fontSize="inherit" color="inherit" />
                      </>
                    ) : null}
                  </span>
                </h2>

                {/* ratings */}
                <div className=" flex">
                  <span className=" text-yellow-500 text-lg font-medium mr-2">
                    {doctor.ratings}
                  </span>
                  <Ratings
                    key={"doctor-rating"}
                    color="text-yellow-500"
                    rating={doctor.ratings}
                    size="text-xl"
                  />
                </div>

                {/* specialty */}
                <div className="flex items-center  gap-4">
                  {/*  */}
                  <div className=" flex items-center gap-2">
                    {doctor.specialization.map((sp, i) => (
                      <div
                        key={i}
                        className=" py-1 px-5 w-fit text-xs bg-blue-200/50 text-primary rounded-full"
                      >
                        {sp}
                      </div>
                    ))}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-black" />
                  <h4 className=" text-red-500 text-xs font-medium">
                    {doctor.yearsOfExperience} years experience
                  </h4>
                </div>

                {/* certifications */}
                <div>
                  {doctor.certifications.map((ce, i) => (
                    <div
                      key={i}
                      className=" mt-2 flex flex-wrap items-center gap-3 text-primary"
                    >
                      <WorkspacePremiumIcon color="inherit" />
                      <span className=" text-grayey text-xs w-[80%] ">
                        {ce}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className={`h-0.5  ${styles.marginX} bg-slate-200 my-10`} />

              {/* about me */}
              <div id="about-me" className={`${styles.paddingX}`}>
                <h2 className=" text-2xl font-semibold text-primary">
                  About Me
                </h2>
                <p className=" mt-3 text-sm text-grayey font-normal leading-6 text-wrap text-justify">
                  {doctor.about}
                </p>
              </div>

              {/* divider */}
              <div className={`h-0.5  ${styles.marginX} bg-slate-200 my-10`} />

              {/* past experience*/}
              <div id="past-experience" className={`${styles.paddingX}`}>
                <h2 className=" text-2xl font-semibold text-primary">
                  Past Experience
                </h2>
                <p className=" mt-3 text-sm text-grayey font-normal leading-6 text-wrap text-justify">
                  <b>{doctor.name}</b> has built a robust career marked by
                  clinical excellence and a dedication to advancing patient
                  care. A career dedicated to medical excellence has included
                  training and practice in top-tier healthcare environments,
                  combining deep expertise with a commitment to innovative
                  treatment approaches.
                </p>

                <div className=" flex flex-col space-y-4 mt-4">
                  {doctor.workExperience.map((ex, i) => (
                    <div
                      key={i}
                      className="  flex items-center justify-between gap-4 bg-gray-200/30 rounded-xl p-6"
                    >
                      <div>
                        <h4 className="text-sm font-medium">{ex.hospital}</h4>
                        <p className=" text-xs text-red-500">{ex.role}</p>
                      </div>
                      <p className=" text-xs text-primary">{ex.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className={`h-0.5  ${styles.marginX} bg-slate-200 my-10`} />

              {/* education*/}
              <div id="past-experience" className={`${styles.paddingX}`}>
                <h2 className=" text-2xl font-semibold text-primary">
                  Education
                </h2>
                <p className=" mt-3 text-sm text-grayey font-normal leading-6 text-wrap text-justify">
                  Board-certified and rigorously trained, Dr.{" "}
                  <b>{doctor.name}</b> holds degrees from leading medical
                  institutions, with specialized education in their field. A
                  commitment to lifelong learning ensures up-to-date,
                  evidence-based care for every patient.
                </p>

                <div className=" flex flex-col space-y-4 mt-4">
                  {doctor.workExperience.map((ex, i) => (
                    <div
                      key={i}
                      className="  flex items-center justify-between gap-4 bg-gray-200/30 rounded-xl p-6"
                    >
                      <div>
                        <h4 className="text-sm font-medium">{ex.hospital}</h4>
                        <p className=" text-xs text-red-500">{ex.role}</p>
                      </div>
                      <p className=" text-xs text-primary">{ex.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className=" flex-1 h-[300px] bg-amber-800 rounded-2xl"></aside>
        </div>
      </RevealWrapper>
    </main>
  );
};

export default Doctor;
