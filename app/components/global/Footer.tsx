import {
  EmailOutlinedIcon,
  LocalPhoneOutlinedIcon,
  LocationOnOutlinedIcon,
} from "../../../app/icons/icons";
import { styles } from "@/app/styles/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RevealWrapper from "./RevealWrapper";

type Props = {};

const Footer = (props: Props) => {
  return (
    <RevealWrapper>
      <footer id="footer" className={styles.footer}>
        <div className=" w-full flex lg:flex-row flex-col justify-between items-start my-6">
          <div className=" basis-1/2">
            {/* logo */}
            <Link
              title="Trust HealthCare"
              href={"#header"}
              className=" flex items-center gap-2"
            >
              <Image
                src={"/logo.png"}
                alt="trust_healthcare_logo"
                width={40}
                height={40}
              />
              <h1 className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
                <span className=" text-primary ">Trust</span> HealthCare
              </h1>
            </Link>

            {/* site description */}
            <p className=" text-xs md:text-sm text-text-secondary mt-8 leading-6 font-light  lg:max-w-[80%]">
              Trust Healthcare provides top-quality medical care, telemedicine
              services, and expert consultations. Book an appointment with our
              certified doctors today.
            </p>
          </div>
          <div className=" basis-1/2 flex md:flex-row flex-col gap-8 items-center md:items-start lg:mt-0 mt-8">
            <div className=" md:w-[60%] ">
              <h4 className=" text-text-primary font-semibold">
                Trust HealthCare
              </h4>
              <ul
                aria-label="links wrapper"
                className=" mt-6  md:text-start text-center"
              >
                <li
                  title="Home"
                  aria-label="Home"
                  className=" mb-2 cursor-pointer transition-all duration-700 hover:text-secondary text-text-primary text-sm"
                >
                  <Link href={"/"}>Home</Link>
                </li>
                <li
                  title="Services"
                  aria-label="Services"
                  className=" mb-2 cursor-pointer transition-all duration-700 hover:text-secondary text-text-primary text-sm"
                >
                  <Link href={"/services"}>Services</Link>
                </li>
                <li
                  title="Docotors"
                  aria-label="Docotors"
                  className=" mb-2 cursor-pointer transition-all duration-700 hover:text-secondary text-text-primary text-sm"
                >
                  <Link href={"/doctors"}>Doctors</Link>
                </li>
                <li
                  title="Contact"
                  aria-label="Contact"
                  className=" mb-2 cursor-pointer transition-all duration-700 hover:text-secondary text-text-primary text-sm"
                >
                  <Link href={"/contact"}>Contact</Link>
                </li>
              </ul>
            </div>

            <div className="">
              <h4 className=" text-text-primary font-semibold text-center md:text-start">
                GET IN TOUCH
              </h4>
              <ul
                aria-label="links wrapper"
                className=" mt-6 md:text-start text-center "
              >
                <li
                  title="Phone"
                  aria-label="Phone"
                  className=" mb-2  text-primary  text-sm flex md:justify-start justify-center items-center gap-4"
                >
                  <LocalPhoneOutlinedIcon color="inherit" />
                  <span className=" text-text-primary">+123-45678-9220</span>
                </li>
                <li
                  title="Address"
                  aria-label="Address"
                  className=" mb-2  text-primary  text-sm flex md:justify-start justify-center items-center gap-4"
                >
                  <LocationOnOutlinedIcon color="inherit" />
                  <span className=" text-text-primary">
                    7c Gerberstr. Seifertgasse 1c, Bayern, Olpe.
                  </span>
                </li>
                <li
                  title="Address"
                  aria-label="Address"
                  className=" mb-2  text-primary  text-sm flex md:justify-start justify-center items-center gap-4"
                >
                  <EmailOutlinedIcon color="inherit" />
                  <span className=" text-text-primary">
                    123trusthealthcare@email.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" my-4 h-[2px] bg-gray-200 w-full mx-auto" />
        <p className=" mt-6 ml-6 text-xs text-black  text-center">
          &copy; {new Date().getFullYear()} Trust HealthCare, All Rights
          Reserved
        </p>
      </footer>
    </RevealWrapper>
  );
};

export default Footer;
