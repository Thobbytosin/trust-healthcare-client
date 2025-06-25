import React, { FC, useState } from "react";
import Ratings from "../ui/Ratings";
import Image from "next/image";
import { VerifiedIcon } from "@/icons/icons";
import { useRouter } from "next/navigation";
import ButtonLoader from "../loaders/ButtonLoader";

type Props = {
  doctor: any;
};

const DoctorCard: FC<Props> = ({ doctor }) => {
  const router = useRouter();
  const [showMoreText, setShowMoreText] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowMore = () => setShowMoreText(!showMoreText);

  const handleNavigate = async (doctorId: string) => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    router.push(`/doctor/${doctorId}`);
  };

  return (
    <div className=" w-full min-h-[fit] bg-white rounded-xl overflow-clip cursor-pointer transition-all duration-700 hover:scale-95 px-4 py-6 flex items-start justify-between gap-2 lg:gap-4 mb-4">
      {/* image */}
      <div className=" w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[200px] xl:h-[200px]  bg-gray-200 overflow-clip rounded-full">
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
        <div className=" lg:max-w-[65%]">
          <h4 className=" text-text-primary text-sm md:text-lg lg:text-xl font-medium">
            {doctor.name}
            <span className="  text-sm text-secondary">
              {doctor.verificationStatus === "Verified" ? (
                <VerifiedIcon fontSize="inherit" color="inherit" />
              ) : null}
            </span>
          </h4>
          <p className=" text-grayey mt-1 text-[10px] md:text-xs font-light">
            {doctor.specialization.length > 1
              ? [...doctor.specialization].join(", ")
              : doctor.specialization[0]}
          </p>
          <p className=" text-grayey mt-1  text-[10px] md:text-xs font-light">
            {doctor.yearsOfExperience} years of practice
          </p>
          <p className=" text-text-primary mt-2 text-xs md:text-sm font-medium capitalize">
            {doctor.city}, {doctor.state}.
          </p>
          <p className=" text-text-primary mt-1 text-[10px] lg:text-xs md:inline-block hidden font-comfortaa">
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

          {/* <p className=" lg:hidden mt-4">
            <span className=" text-xs font-semibold text-secondary">FREE</span>
            <span className=" line-through text-grayey text-xs ml-2">
              &#8358; 20,000
            </span>
            <span className=" text-text-primary text-xs block font-medium">
              FREE Consultation for first appointment!
            </span>
          </p> */}

          {/* hide on tablet */}
          {/* <p className="hidden lg:block mt-4">
            <span className=" text-xs font-semibold text-secondary">FREE</span>
            <span className=" line-through text-grayey text-xs ml-2">
              &#8358; 20,000
            </span>
            <span className=" text-text-primary text-xs block font-medium">
              Consultation fee at the clinic.
            </span>
          </p> */}

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
        <div className="mt-4 lg:mt-0 flex flex-col  lg:items-center justify-end w-fit lg:w-[35%]">
          {doctor.available ? (
            <p className=" text-secondary text-[10px] md:text-xs ">
              Available Today!
            </p>
          ) : (
            <p className=" text-red-500 text-[10px] md:text-xs ">
              Not Available Today!
            </p>
          )}

          {doctor.available ? (
            loading ? (
              <ButtonLoader />
            ) : (
              <button
                onClick={() => handleNavigate(doctor.id)}
                className=" cursor-pointer transition-all hover:bg-gray-200 hover:text-text-primary rounded-lg text-center bg-primary text-white  py-1.5 md:py-3 md:mt-4 mt-2 px-3 md:px-6 text-[10px] md:text-xs"
              >
                Book Session
              </button>
            )
          ) : (
            <button
              disabled
              className=" opacity-50 cursor-not-allowed  rounded-lg text-center  bg-gray-400 text-white py-1.5 md:py-3 mt-2 md:mt-4 px-3 md:px-6 text-[10px] md:text-xs"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
