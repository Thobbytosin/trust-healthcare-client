import React, { FC, useState } from "react";
import Ratings from "../global/Ratings";
import Image from "next/image";
import { VerifiedIcon } from "../../../app/icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Review {
  reviewerName: string;
  comment: string;
  rating: number;
  date: string; // ISO date string
}

export interface Doctor {
  name: string;
  email: string;
  securityAnswer: string;
  hospital: string;
  specialization: string;
  experience: string;
  education: string[];
  licenseNumber: string;
  certifications: string[];
  availableDays: string[];
  timeSlots: string[];
  holidays: string[]; // ISO date strings
  clinicAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phone: number;
  altPhone: string;
  ratings: number;
  reviews: Review[]; // You'll need to define the Review interface/type
  appointments: string[]; // Assuming these are appointment IDs
  maxPatientsPerDay: number;
  about: string;
  thumbnail: {
    id: string;
    url: string;
  };
  verificationStatus: "Verified" | "Unverified" | "Pending"; // Example of possible values
}

type Props = {
  doctor: any;
};

const DoctorCard: FC<Props> = ({ doctor }) => {
  const router = useRouter();
  const [showMoreText, setShowMoreText] = useState(false);

  const toggleShowMore = () => setShowMoreText(!showMoreText);

  console.log(doctor);
  return (
    <div className=" w-full min-h-[fit] bg-white  rounded-xl overflow-clip cursor-pointer transition-all duration-700 hover:scale-95 p-4 flex items-start justify-between gap-2 lg:gap-4 mb-4">
      {/* image */}
      <div className=" lg:w-[30%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:h-[200px]  bg-gray-200 overflow-clip rounded-full">
        <Image
          src={doctor.image}
          alt="doctor_image"
          width={100}
          height={100}
          className="object-cover w-full"
        />
      </div>

      {/* details */}
      <div className="w-[70%] mt-2 px-3 lg:flex gap-4  h-full ">
        <div className=" lg:max-w-[80%]">
          <h4 className=" text-text-primary text-lg md:text-xl font-medium relative">
            {doctor.name}
            <span className="  absolute -top-1 text-sm text-secondary">
              {doctor.verificationStatus === "Verified" ? (
                <VerifiedIcon fontSize="inherit" color="inherit" />
              ) : null}
            </span>
          </h4>
          <p className=" text-grayey mt-1 text-xs font-light">
            {doctor.specialization.length > 1
              ? [...doctor.specialization].join(", ")
              : doctor.specialization[0]}
          </p>
          <p className=" text-grayey mt-1 text-xs font-light">
            {doctor.yearsOfExperience} years of practice
          </p>
          <p className=" text-text-primary mt-2 text-sm font-medium">
            {doctor.city}, {doctor.state}.
          </p>
          <p className=" text-text-primary mt-1 text-xs">
            {doctor.about.length <= 50
              ? doctor.about
              : showMoreText
              ? doctor.about
              : `${doctor.about.slice(0, 50)}...`}
            <button
              onClick={toggleShowMore}
              className=" ml-3 cursor-pointer text-blue-500 underline"
            >
              {showMoreText ? "Show less" : "Show more"}
            </button>
          </p>

          {/* hide on laptop */}

          <p className=" lg:hidden mt-4">
            <span className=" text-xs font-semibold text-secondary">FREE</span>
            <span className=" line-through text-grayey text-xs ml-2">
              &#8358; 20,000
            </span>
            <span className=" text-text-primary text-xs block font-medium">
              Consultation fee at the clinic.
            </span>
          </p>

          {/* hide on tablet */}
          <p className="hidden lg:block mt-4">
            <span className=" text-xs font-semibold text-secondary">FREE</span>
            <span className=" line-through text-grayey text-xs ml-2">
              &#8358; 20,000
            </span>
            <span className=" text-text-primary text-xs block font-medium">
              Consultation fee at the clinic.
            </span>
          </p>

          {/* hide ratings on mobile */}
          <div className=" text-lg hidden md:flex items-center gap-3 mt-4 ">
            <span className=" bg-secondary text-xs font-medium text-white p-1">
              {Number.isInteger(doctor.ratings)
                ? doctor.ratings.toFixed(1)
                : doctor.ratings}
            </span>
            <Ratings color=" text-secondary" rating={doctor.ratings} />
          </div>

          <div className=" text-lg md:hidden flex items-center gap-3 mt-4 ">
            <span className=" bg-secondary text-xs font-medium text-white p-1">
              {Number.isInteger(doctor.ratings)
                ? doctor.ratings.toFixed(1)
                : doctor.ratings}
            </span>
            <Ratings color=" text-secondary" rating={doctor.ratings} />
          </div>
        </div>

        {/* book appointment btn */}
        <div className="mt-4 lg:mt-0 flex flex-col  lg:items-center justify-end">
          <p className=" text-secondary text-sm ">Available Today!</p>

          <button
            onClick={() => router.push(`/doctor/${doctor._id}`)}
            className=" cursor-pointer transition-all hover:bg-gray-200 hover:text-text-primary rounded-lg text-center bg-primary text-white py-3 mt-4 px-8 text-xs"
          >
            Book a FREE Appointment!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
