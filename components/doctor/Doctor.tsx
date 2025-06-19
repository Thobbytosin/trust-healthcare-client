"use client";

import React, { useEffect, useRef, useState } from "react";
import RevealWrapper, { fadeInDown } from "../ui/RevealWrapper";
import Header from "../global/header/Header";
import LandingPageLoader from "../global/loaders/LandingPageLoader";
import { useFetchDoctor } from "@/hooks/useFetchDoctor";
import { styles } from "@/styles/styles";
import { useDoctorsStore } from "@/store/useDoctorsStore";
import Image from "next/image";
import banner from "@/public/assets/header-banner.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  VerifiedIcon,
  WorkspacePremiumIcon,
} from "@/icons/icons";
import Ratings from "../ui/Ratings";
import BookingForm from "./BookingForm";
import Head from "next/head";

type Props = {
  doctorId: string;
};

const Doctor = ({ doctorId }: Props) => {
  const { loading } = useFetchDoctor(doctorId);
  const [mounted, setMounted] = useState(false);
  const doctor = useDoctorsStore((state) => state.doctor);
  const eduContainer = useRef<HTMLDivElement | null>(null);

  const navigation = (direction: "left" | "right") => {
    const container = eduContainer.current;

    if (!container) return;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 10)
        : container.scrollLeft + (container.offsetWidth + 10);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (Object.keys(doctor).length === 0 || loading) {
    return <LandingPageLoader />;
  }

  // console.log(doctor);

  return (
    <main className=" min-h-screen bg-gray-200 pb-20">
      {/* Don't render Header until data is loaded */}
      {!loading && <Header activeIndex={-1} />}

      <RevealWrapper key={"doctor"} variants={fadeInDown} animate>
        {/* blue header */}
        <div className=" bg-primary h-[80px] md:h-[100px] w-full mt-20 rounded-b-xl" />

        <div
          className={`${styles.paddingX} -mt-[50px] w-full flex lg:flex-row flex-col gap-8 items-start justify-between`}
        >
          <section
            className={`w-full lg:w-[60%] h-fit ${styles.paddingBottom} bg-white rounded-2xl`}
          >
            {/* header banner */}
            <div className=" relative w-full h-[140px] md:h-[200px] rounded-t-2xl overflow-clip">
              <Image
                src={banner}
                alt="doctor_banner"
                fill
                className=" object-cover"
              />
            </div>

            {/* doctor profile */}
            {/* avatar */}
            <div className=" absolute md:left-[5rem] left-[3rem] -mt-20 z-10">
              <div className=" relative  rounded-full md:w-40 md:h-40 h-30 w-30 bg-gray-100 border-4 border-white overflow-hidden">
                <Image
                  src={doctor.image}
                  alt="doctor_image"
                  fill
                  className=" object-contain"
                />
              </div>
            </div>

            {/* content */}
            <div className=" w-full">
              <div className="  flex flex-col space-y-2  mt-12 md:mt-10 md:ml-50 md:px-0 px-8">
                {/* name */}
                <h2 className=" text-lg md:text-2xl font-semibold">
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
                <div className=" w-full flex justify-between items-end">
                  <div className=" flex">
                    <span className=" text-yellow-500 text-sm md:text-lg font-medium mr-2">
                      {doctor.ratings}
                    </span>
                    <Ratings
                      key={"doctor-rating"}
                      color="text-yellow-500"
                      rating={doctor.ratings}
                      size="text-base md:text-xl"
                    />
                  </div>

                  <h4 className="md:w-[30%] text-red-500 text-[10px] inline-block md:hidden md:text-xs font-medium mt-2 md:mt-0">
                    {doctor.yearsOfExperience} years experience
                  </h4>
                </div>

                {/* specialty */}
                <div className=" w-full flex md:flex-row  justify-between  flex-col md:items-end  md:gap-4">
                  {/*  */}
                  <div className=" w-full md:w-[70%]  flex-wrap flex items-center gap-2">
                    {doctor.specialization.map((sp, i) => (
                      <div
                        key={i}
                        className=" py-1 px-3 md:px-5 w-fit text-[10px] md:text-xs bg-blue-200/50 text-primary rounded-full"
                      >
                        {sp}
                      </div>
                    ))}
                  </div>
                  <h4 className="md:w-[30%] text-red-500 text-[10px] md:inline-block hidden md:text-xs font-medium mt-2 md:mt-0">
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
                      <span className=" text-grayey text-[10px] md:text-xs w-[80%] ">
                        {ce}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className={styles.sectionDivider} />

              {/* about me */}
              <div id="about-me" className={`${styles.paddingX}`}>
                <h2 className={styles.doctorBioSubheading}>About Me</h2>
                <p className={styles.paragraph}>{doctor.about}</p>
              </div>

              {/* divider */}
              <div className={styles.sectionDivider} />

              {/* past experience*/}
              <div id="past-experience" className={`${styles.paddingX}`}>
                <h2 className={styles.doctorBioSubheading}>Past Experience</h2>
                <p className={styles.paragraph}>
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
                      className="  flex md:flex-row flex-col md:items-center md:justify-between gap-4 bg-gray-200/30 rounded-xl p-6"
                    >
                      <div>
                        <h4 className="text-xs md:text-sm font-medium">
                          {ex.hospital}
                        </h4>
                        <p className="text-[10px] md:text-xs text-red-500 mt-1">
                          {ex.role}
                        </p>
                      </div>
                      <p className=" text-xs text-primary font-medium">
                        {ex.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className={styles.sectionDivider} />

              {/* education*/}
              <div id="education" className={`w-full ${styles.paddingX}`}>
                <h2 className={styles.doctorBioSubheading}>Education</h2>
                <p className={styles.paragraph}>
                  Board-certified and rigorously trained, Dr.{" "}
                  <b>{doctor.name}</b> holds degrees from leading medical
                  institutions, with specialized education in their field. A
                  commitment to lifelong learning ensures up-to-date,
                  evidence-based care for every patient.
                </p>

                {/* scroll buttons */}
                <div className=" w-full flex items-center justify-end gap-4 mt-6">
                  <button
                    type="button"
                    disabled={doctor.education.length <= 1}
                    onClick={() => navigation("left")}
                    className={`${
                      doctor.education.length <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } w-8 h-8  rounded-full text-primary`}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigation("right")}
                    className={`${
                      doctor.education.length <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } w-8 h-8  rounded-full text-primary`}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>

                <div
                  ref={eduContainer}
                  className=" w-full overflow-y-hidden flex space-x-4 mt-4 education-scrollbar"
                >
                  {doctor.education.map((edu, i) => (
                    <div
                      key={i}
                      className=" shrink-0 mb-6 w-[250px] min-h-[130px]  border border-gray-300  flex flex-col justify-center space-y-3 rounded-md px-2"
                    >
                      <h4 className="text-xs text-primary font-medium">
                        {edu.graduationYear}
                      </h4>
                      <p className=" text-xs font-medium">{edu.institution}</p>

                      <p className=" text-[10px] text-gray-600">{edu.course}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside
            className={` lg:w-[40%] w-full sticky top-20 h-fit bg-white rounded-2xl ${styles.bookingPadding} overflow-hidden `}
          >
            <BookingForm />
          </aside>
        </div>
      </RevealWrapper>
    </main>
  );
};

export default Doctor;
