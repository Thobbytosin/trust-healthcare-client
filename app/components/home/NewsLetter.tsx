import { styles } from "@/app/styles/styles";
import React from "react";
import SectionHeading from "../global/SectionHeading";
import RevealWrapper from "../global/RevealWrapper";

type Props = {};

const NewsLetter = (props: Props) => {
  return (
    <RevealWrapper>
      <section className={styles.newSection}>
        <SectionHeading
          key="newsletter"
          heading="Subscribe To Our Newsletter"
          desc="Get latest news of our hospital"
        />

        <div className=" mt-10 w-full md:w-[70%] mx-auto bg-[#F4F4F4] md:p-10 p-6 rounded-xl">
          <h3 className=" text-sm text-text-primary">For Newsletter</h3>
          <form className=" w-full p-2 border border-[#CBCBCB] rounded-md flex justify-between items-center mt-2">
            <input
              name="email"
              type="email"
              placeholder="Enter your email here"
              required
              className=" bg-transparent w-[80%] outline-none text-text-primary text-xs md:text-sm"
            />
            <button
              type="submit"
              title="Subscribe"
              aria-label="Subscribe Button"
              className=" text-white bg-primary rounded-lg text-center py-1.5 px-3 md:px-6 text-xs cursor-pointer transition-all duration-700 hover:bg-white hover:text-primary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </RevealWrapper>
  );
};

export default NewsLetter;
