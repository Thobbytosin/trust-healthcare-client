"use client";
import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { styles } from "@/styles/styles";
import {
  BookOnlineOutlinedIcon,
  ContactSupportOutlinedIcon,
  ElectricRickshawOutlinedIcon,
  ScienceOutlinedIcon,
} from "@/icons/icons";
import { motion } from "framer-motion";
import RevealWrapper from "../ui/RevealWrapper";

type Props = {};

const servicesData = [
  {
    id: 1,
    name: "Well Equipped Lab",
    icon: <ScienceOutlinedIcon fontSize="medium" />,
  },
  {
    id: 1,
    name: "Emergency",
    icon: <ElectricRickshawOutlinedIcon fontSize="medium" />,
  },
  {
    id: 1,
    name: "Online Appointment",
    icon: <BookOnlineOutlinedIcon fontSize="medium" />,
  },
  {
    id: 1,
    name: "Call Centre",
    icon: <ContactSupportOutlinedIcon fontSize="medium" />,
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
          <div className="grid gap-6 md:gap-10 lg:grid-cols-4 grid-cols-2 ">
            {servicesData.map((item, index) => (
              <motion.div
                key={index}
                aria-label={`${item} card`}
                title={`${item.name} card`}
                className=" w-[160px] h-[140px] md:w-[221px] md:h-[201px] shadow shadow-black/20 rounded-4xl bg-white transition-all duration-700 hover:bg-primary text-primary hover:text-white flex flex-col justify-center items-center gap-8"
              >
                {item.icon}
                <p className=" md:text-sm text-xs font-poppins">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </RevealWrapper>
  );
};

export default Services;
