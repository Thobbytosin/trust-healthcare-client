"use client";
import React from "react";
import heroBanner from "../../../public/assets/hero.png";
import Image from "next/image";
import {
  ArrowRightAltIcon,
  PlayArrowOutlinedIcon,
} from "../../../app/icons/icons";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/styles";
import RevealWrapper from "../global/RevealWrapper";

type Props = {};

const Hero = (props: Props) => {
  // const searchParams = useSearchParams();
  // console.log(searchParams.get("message"));

  return (
    <RevealWrapper animate>
      <section
        className={`w-screen md:h-screen flex md:flex-row flex-col md:justify-between lg:items-center overflow-x-hidden ${styles.paddingX} xl:mt-0 mt-30 md:gap-10  `}
      >
        {/* content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
          className=" md:w-[55%] w-full "
        >
          <h1 className=" text-[1.8rem] sm:text-[2rem] lg:text-[2.5rem] font-medium mb-4 lg:max-w-[80%] md:text-left text-center">
            <span className=" text-primary">We care</span>
            <br />
            <span className=" text-text-primary">about your health</span>
          </h1>
          <p className="text-text-secondary leading-[1.6rem] sm:leading-[1.9rem] text-[12px] lg:text-[14px] md:text-left text-center">
            Good health is the state of mental, physical and social well being
            and it does not just mean absence of diseases.
          </p>

          {/* CTA */}
          <div className=" w-full flex justify-center md:justify-normal items-center mt-8 lg:mt-15 gap-5 lg::gap-20 ">
            {/* button */}
            <button
              type="button"
              title="Appointment Button"
              aria-label="appointment button"
              className="  cursor-pointer bg-primary px-6 py-2.5 rounded-md transition duration-300 hover:border hover:border-primary hover:text-primary hover:dark:text-white text-center text-white hover:bg-transparent lg:text-[14px] text-[12px]"
            >
              <span className="hidden lg:inline-block mr-2">
                Book an appointment
                <ArrowRightAltIcon />
              </span>
              <span className="lg:hidden">Book appointment</span>
            </button>

            {/* watch videos cta */}
            <a
              href="#video-section"
              type="button"
              title="Watch Video"
              className="cursor-pointer flex items-center lg:gap-3"
            >
              <div className=" relative -z-50">
                {/* Pulsing Animation */}
                <motion.div
                  className="absolute inset-0 h-full w-full rounded-full border border-[#C7C7C7] "
                  animate={{
                    scale: [1, 1.4, 1], // Expanding and shrinking effect
                    opacity: [0.8, 0.6, 0], // Fades out smoothly
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <div className=" lg:h-[63px] lg:w-[63px] w-[40px] h-[40px] border border-[#C7C7C7] rounded-full flex justify-center items-center">
                  <div className=" lg:w-[45px] lg:h-[45px] h-[30px] w-[30px] bg-primary rounded-full text-white flex justify-center items-center">
                    <PlayArrowOutlinedIcon />
                  </div>
                </div>
              </div>
              <h3 className=" text-text-primary lg:text-base text-xs md:ml-0 ml-2">
                Watch Video
              </h3>
            </a>
          </div>

          <div className=" mt-8 md:text-left text-center ">
            <h3 className=" text-text-primary lg:text-base text-xs">
              <span>Become member of our hospital community?</span>
              <span className="text-primary ml-2 cursor-pointer hover:underline transition-all duration-500">
                Sign up
              </span>
            </h3>
          </div>
        </motion.div>

        {/* image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
          className=" md:w-[60%] w-full xl:mx-0 mx-auto lg:w-[45%]  rounded-full xl:my-0 "
        >
          <Image
            src={heroBanner}
            alt="banner_image"
            height={200}
            width={200}
            className=" w-[100%]"
            priority
          />
        </motion.div>
      </section>
    </RevealWrapper>
  );
};

export default Hero;
