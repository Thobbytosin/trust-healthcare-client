"use client";
import { styles } from "@/styles/styles";
import React, { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import Ratings from "../ui/Ratings";
import Image from "next/image";
import { motion } from "framer-motion";
import RevealWrapper from "../ui/RevealWrapper";
import { useRouter } from "next/navigation";
import ButtonLoader from "../loaders/ButtonLoader";
import { TDoctor } from "@/types/doctor.types";

type Props = {
  doctors: TDoctor[];
};

const MeetDoctors = ({ doctors }: Props) => {
  const router = useRouter();
  const [loadingIndex, setLoadingInex] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<string | undefined>();

  const handleBtnNavigate = async (id: string, index: number) => {
    router.prefetch(`/doctor/${id}`);

    setLoadingInex(index);
    setCurrentId(id);

    setTimeout(() => {
      router.push(`/doctor/${id}`);
      setLoadingInex(index);
      setCurrentId(undefined);
    }, 1000);
  };

  return (
    <RevealWrapper>
      <section className={styles.newSection}>
        <SectionHeading
          key={"meet-doctors"}
          heading="Meet our Doctors"
          desc="Well  qualified doctors are ready to serve you"
        />

        {/* doctors section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }} // Start small and invisible
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
              duration: 30,
              ease: "easeOut",
            },
          }} // Animate when in viewport
          // Smooth animation
          viewport={{ amount: 0.2 }}
          className=" flex justify-center items-center mt-10"
        >
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 font-poppins">
            {doctors?.map((doctor, index) => (
              <div
                key={index}
                className={`bg-white w-[280px] md:w-[302px] lg:w-[394px] py-10 h-fit shadow shadow-black/20 rounded-md flex flex-col justify-center items-center`}
              >
                {loadingIndex === index && doctor.id === currentId ? (
                  <ButtonLoader />
                ) : (
                  <div className=" w-[80%] h-[90%]  flex flex-col lg:justify-between ">
                    <div
                      className=" cursor-pointer"
                      onClick={() => handleBtnNavigate(doctor.id, index)}
                    >
                      {/* available indicator */}
                      <div className="w-fit flex justify-center items-center px-2 py-0.5 bg-[#EDEDED] rounded-full gap-2 ">
                        <div
                          className={`md:w-[8px] md:h-[8px] w-[6px] h-[6px] rounded-full ${
                            doctor.available ? "bg-primary" : "bg-red-500"
                          } `}
                        />
                        <h4 className=" text-[10px] md:text-xs text-text-primary">
                          {doctor.available ? "Available" : "Not Available"}
                        </h4>
                      </div>

                      {/* image card */}
                      <div className="relative w-full flex justify-center items-center bg-primary rounded-3xl h-[140px] lg:h-[198px] mt-6 lg:mt-2">
                        <div className=" absolute bottom-0 bg-blue-300/20 w-40 md:w-50 h-[60%] rounded-t-3xl">
                          <Image
                            src={doctor.image || ""}
                            alt="doctor_image"
                            width={100}
                            height={100}
                            className=" object-contain w-[100%] absolute -bottom-1 clippedImage "
                          />
                        </div>
                      </div>
                    </div>

                    {/* doctor details */}
                    <div className=" w-full flex flex-col justify-center items-center">
                      <h3 className=" text-text-primary text-center mt-2 font-medium text-base">
                        {doctor.name}
                      </h3>
                      <p className=" text-red-500 mt-1 text-center text-xs font-comfortaa">
                        {doctor.specialization.length > 1
                          ? doctor.specialization.join(", ")
                          : doctor.specialization[0]}
                      </p>
                      <div className=" mt-6 text-2xl">
                        <Ratings
                          color=" text-primary"
                          rating={doctor.ratings || 0}
                        />
                      </div>

                      {/* button */}
                      {/* {doctor.available ? (
                      <div className=" w-full">
                        {loadingIndex === index && currentId === doctor.id ? (
                          <ButtonLoader />
                        ) : (
                          <button
                            type="button"
                            title="Book Appointment"
                            aria-label="Book Appointment"
                            onClick={() => handleBtnNavigate(doctor.id, index)}
                            className=" text-sm lg:text-base w-full text-center py-2 transition-all duration-700 border border-primary text-primary mt-3 cursor-pointer hover:bg-primary hover:text-white rounded-full hover:border-0"
                          >
                            Book Appointment
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        title="Book Appointment"
                        aria-label="Book Appointment"
                        className=" text-sm lg:text-base w-full text-center py-2  bg-gray-300 mt-3 cursor-not-allowed  text-white rounded-xl "
                      >
                        Not Available
                      </button>
                    )} */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* see more button */}
        <div className=" w-full flex justify-center font-poppins">
          <button
            type="button"
            title="See More"
            aria-label="See More"
            onClick={() => router.push("/find-doctors")}
            className="rounded-lg px-6 mt-10 duration-700 transition-all hover:bg-transparent hover:border hover:border-primary hover:text-primary bg-primary text-white text-center py-2 cursor-pointer"
          >
            See More
          </button>
        </div>
      </section>
    </RevealWrapper>
  );
};

export default MeetDoctors;
