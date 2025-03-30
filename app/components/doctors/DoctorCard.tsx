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
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  return (
    <div className=" w-full min-h-[fit] bg-white  rounded-xl overflow-clip cursor-pointer transition-all duration-700 hover:scale-95 p-4 flex items-start justify-between gap-2 lg:gap-4 mb-4">
      {/* image */}
      <div className=" lg:w-[30%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:h-[200px]  bg-gray-200 overflow-clip rounded-full">
        <Image
          src={doctor.thumbnail.url}
          alt="doctor_image"
          width={100}
          height={100}
          className="object-cover w-full"
        />
      </div>

      {/* details */}
      <div className="w-[70%] mt-2 px-3 lg:flex gap-4  h-full">
        <div className=" lg:max-w-[70%]">
          <h4 className=" text-text-primary text-lg md:text-xl font-medium relative">
            {doctor.name}
            <span className="  absolute -top-1 text-sm text-secondary">
              {doctor.verificationStatus ? (
                <VerifiedIcon fontSize="inherit" color="inherit" />
              ) : null}
            </span>
          </h4>
          <p className=" text-grayey mt-1 text-xs font-light">
            {doctor.specialization}
          </p>
          <p className=" text-grayey mt-1 text-xs font-light">
            {doctor.experience} of practice
          </p>
          <p className=" text-text-primary mt-2 text-sm font-medium">
            {doctor.city}, {doctor.state}.
          </p>
          <p className=" text-text-primary mt-1 text-xs">
            {doctor.about}{" "}
            {showMore ? (
              <span
                onClick={() => setShowMore(false)}
                className=" underline text-primary cursor-pointer"
              >
                less
              </span>
            ) : (
              <span
                onClick={() => setShowMore(true)}
                className=" underline text-primary cursor-pointer"
              >
                more
              </span>
            )}
          </p>
          {showMore ? (
            <>
              <p className=" text-grayey text-xs mt-1">
                {[...doctor.education].join(", ")}
              </p>
              <p className="text-grayey text-xs mt-0.5">
                {[...doctor.certifications].join(", ")}
              </p>
            </>
          ) : null}

          {/* hide on laptop */}
          {showMore ? (
            <p className=" lg:hidden mt-4">
              <span className=" text-xs font-semibold text-secondary">
                FREE
              </span>
              <span className=" line-through text-grayey text-xs ml-2">
                &#8358; 20,000
              </span>
              <span className=" text-text-primary text-xs block font-medium">
                Consultation fee at the clinic.
              </span>
            </p>
          ) : null}

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

          {showMore ? (
            <div className=" text-lg md:hidden flex items-center gap-3 mt-4 ">
              <span className=" bg-secondary text-xs font-medium text-white p-1">
                {Number.isInteger(doctor.ratings)
                  ? doctor.ratings.toFixed(1)
                  : doctor.ratings}
              </span>
              <Ratings color=" text-secondary" rating={doctor.ratings} />
            </div>
          ) : null}
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
