"use client";
import React from "react";
import SectionHeading from "../global/SectionHeading";
import { styles } from "../../styles/styles";
import {
  BookOnlineOutlinedIcon,
  ContactSupportOutlinedIcon,
  ElectricRickshawOutlinedIcon,
  ScienceOutlinedIcon,
} from "../../../app/icons/icons";
import { motion } from "framer-motion";
import RevealWrapper from "../global/RevealWrapper";

type Props = {};

const servicesData = [
  {
    id: 1,
    name: "Well Equipped Lab",
    icon: <ScienceOutlinedIcon fontSize="large" />,
  },
  {
    id: 1,
    name: "Emergency Ambulance",
    icon: <ElectricRickshawOutlinedIcon fontSize="large" />,
  },
  {
    id: 1,
    name: "Online Appointment",
    icon: <BookOnlineOutlinedIcon fontSize="large" />,
  },
  {
    id: 1,
    name: "Call Centre",
    icon: <ContactSupportOutlinedIcon fontSize="large" />,
  },
];

const Services = (props: Props) => {
  return (
    <RevealWrapper>
      <section className={styles.newSection}>
        <SectionHeading
          key={"services"}
          heading="Our Medical Services"
          desc="We are dedicated to serve you best medical services"
        />

        {/* cards section */}
        <motion.div
          className=" flex justify-center items-center mt-10"
          initial={{ scale: 0.5, opacity: 0 }} // Start small and invisible
          whileInView={{ scale: 1, opacity: 1 }} // Animate when in viewport
          transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
          viewport={{ amount: 0.2 }}
        >
          <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-2 grid-cols-1  ">
            {servicesData.map((item, index) => (
              <motion.div
                key={index}
                aria-label={`${item} card`}
                title={`${item.name} card`}
                className=" w-[221px] h-[201px] md:w-[271px] md:h-[251px] shadow shadow-black/20 rounded-4xl bg-white transition-all duration-700 hover:bg-primary text-primary hover:text-white flex flex-col justify-center items-center gap-8"
              >
                {item.icon}
                <p className=" md:text-base text-sm">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </RevealWrapper>
  );
};

export default Services;
