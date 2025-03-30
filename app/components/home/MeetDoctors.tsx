"use client";
import { styles } from "../../../app/styles/styles";
import React from "react";
import SectionHeading from "../global/SectionHeading";
import Ratings from "../global/Ratings";
import Image from "next/image";
import { motion } from "framer-motion";
import RevealWrapper from "../global/RevealWrapper";
import { useRouter } from "next/navigation";
import { IDoctor } from "../../../app/store/useDoctorsStore";

type Props = {
  doctors: IDoctor[];
};

const MeetDoctors = ({ doctors }: Props) => {
  const router = useRouter();
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
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            {doctors.slice(4, 8).map((doctor, index) => (
              <div
                key={index}
                className=" bg-white w-[302px] lg:w-[394px] h-[447px] shadow shadow-black/20 rounded-md flex flex-col justify-center items-center"
              >
                <div className=" w-[80%] h-[90%]  flex flex-col lg:justify-between ">
                  <div>
                    {/* available indicator */}
                    <div className="w-fit flex justify-center items-center px-2 py-0.5 bg-[#EDEDED] rounded-full gap-2 ">
                      <div className=" w-[8px] h-[8px] rounded-full bg-primary " />
                      <h4 className=" text-xs text-text-primary">Available</h4>
                    </div>

                    {/* image card */}
                    <div className="relative w-full flex justify-center items-center bg-primary rounded-3xl h-[140px] lg:h-[198px] mt-6 lg:mt-2">
                      <div className=" absolute bottom-0 bg-blue-300/20 w-40 md:w-50 h-[60%] rounded-t-3xl">
                        <Image
                          src={doctor?.thumbnail?.url || ""}
                          alt="doctor_image"
                          width={100}
                          height={100}
                          className=" object-contain w-[100%] absolute -bottom-1 clippedImage "
                        />
                      </div>
                    </div>
                  </div>

                  {/* doctor details */}
                  <div className="lg:mt-0 mt-6 w-full flex flex-col justify-center items-center">
                    <h3 className=" text-text-primary text-center text-lg">
                      {doctor.name}
                    </h3>
                    <p className=" text-text-light-gray mt-1 text-center">
                      {doctor.specialization}
                    </p>
                    <div className=" mt-6 text-2xl">
                      <Ratings
                        color=" text-primary"
                        rating={doctor.ratings || 0}
                      />
                    </div>

                    {/* button */}
                    <button
                      type="button"
                      title="Book Appointment"
                      aria-label="Book Appointment"
                      className=" text-sm lg:text-base w-full text-center py-2 transition-all duration-700 border border-primary text-primary mt-3 cursor-pointer hover:bg-primary hover:text-white rounded-xl hover:border-0"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* see more button */}
        <div className=" w-full flex justify-center">
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
