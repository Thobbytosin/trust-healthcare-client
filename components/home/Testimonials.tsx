import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { styles } from "@/styles/styles";
import Image from "next/image";
import Ratings from "../ui/Ratings";
import RevealWrapper from "../ui/RevealWrapper";
import user1 from "@/public/assets/testi1.jpg";
import user2 from "@/public/assets/testi2.jpg";
import user3 from "@/public/assets/testi3.jpg";
import user4 from "@/public/assets/testi4.jpg";
import user5 from "@/public/assets/testi5.jpg";
import user6 from "@/public/assets/testi6.jpg";
import user7 from "@/public/assets/testi7.jpg";
import user8 from "@/public/assets/testi8.jpg";

type Props = {};

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: user1,
    feedback: "Great service! Highly recommended.",
    ratings: 4.2,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: user2,
    feedback: "Very professional and helpful.",
    ratings: 4,
  },
  {
    id: 3,
    name: "Samuel Johnson",
    image: user3,
    feedback: "Amazing experience!",
    ratings: 3.9,
  },
  {
    id: 4,
    name: "Grace Williams",
    image: user4,
    feedback: "Reliable and trustworthy service.",
    ratings: 5,
  },
  {
    id: 5,
    name: "Donna Meadow",
    image: user5,
    feedback: "Reliable and trustworthy service.",
    ratings: 4.4,
  },
  {
    id: 6,
    name: "Phil Henry",
    image: user6,
    feedback: "Reliable and trustworthy service.",
    ratings: 4.1,
  },
  {
    id: 7,
    name: "Kenneth Joe",
    image: user7,
    feedback: "Reliable and trustworthy service.",
    ratings: 5,
  },
  {
    id: 8,
    name: "Kimberly Ann O.",
    image: user8,
    feedback: "Reliable and trustworthy service.",
    ratings: 3.5,
  },
];

const Testimonials = (props: Props) => {
  return (
    <RevealWrapper>
      <section className={styles.newSection}>
        <SectionHeading
          key={"testimonial"}
          heading="Patients' Testimonials"
          desc="Let’s see what our happy patients says"
        />

        <div
          aria-label="testimonial-group"
          className={`mt-10 ${styles.marginX} w-full overflow-hidden flex gap-6 p-10 `}
        >
          <div className="flex-grow-0 flex-shrink-0 basis-[100%] flex space-x-6 animate-scroll ">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className=" w-[348px] h-[181px] bg-white shadow-lg shadow-black/10 rounded-lg flex items-start gap-6 p-6"
              >
                {/* image profile */}
                <div className=" relative basis-1/4 mr-4">
                  <div className="absolute left-0 w-[74px] h-[74px] rounded-full bg-primary" />
                  <div className="absolute left-3 z-10 w-[74px] h-[74px] rounded-full bg-gray-200 overflow-clip">
                    <Image
                      src={testimonial.image}
                      alt="user_image"
                      fill
                      sizes="(max-width: 768px) 74px, 74px"
                      className=" w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* user */}
                <div className="basis-3/4">
                  <h3 className=" font-medium text-text-primary text-lg font-poppins">
                    {testimonial.name}
                  </h3>
                  <div className=" mt-2">
                    <Ratings
                      key={index}
                      color="text-primary"
                      rating={testimonial.ratings}
                    />
                  </div>
                  <p className="text-text-primary font-light text-sm mt-4 font-comfortaa">
                    {testimonial.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Add `aria-hidden` to hide the duplicated cards from screen readers. --> */}
          <div
            aria-hidden
            className="flex-grow-0 flex-shrink-0 basis-[100%] flex space-x-6 animate-scroll "
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className=" w-[348px] h-[181px] bg-white shadow-lg shadow-black/10 rounded-lg flex items-start gap-6 p-6"
              >
                {/* image profile */}
                <div className=" relative basis-1/4 mr-4">
                  <div className="absolute left-0 w-[74px] h-[74px] rounded-full bg-primary" />
                  <div className="absolute left-3 z-10 w-[74px] h-[74px] rounded-full bg-gray-200 overflow-clip">
                    <Image
                      src={testimonial.image}
                      alt="user_image"
                      width={100}
                      height={100}
                      sizes=""
                      className=" w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* user */}
                <div className="basis-3/4">
                  <h3 className=" font-medium text-text-primary text-lg font-poppins">
                    {testimonial.name}
                  </h3>
                  <div className=" mt-2">
                    <Ratings
                      key={index}
                      color="text-primary"
                      rating={testimonial.ratings}
                    />
                  </div>
                  <p className="text-text-primary font-light text-sm mt-4 font-comfortaa">
                    {testimonial.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealWrapper>
  );
};

export default Testimonials;
