import Image from "next/image";
import React from "react";
import Expired from "@/public/assets/expired.png";
import Expired2 from "@/public/assets/expired2.png";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";

type Props = {
  handleClick: (() => void) | undefined;
  setLoading?: (value: boolean) => void;
  loading: boolean | undefined;
};

const UserInactivity = ({ handleClick, loading, setLoading }: Props) => {
  return (
    <div className=" py-10 relative w-full h-full flex flex-col justify-center items-center">
      <div className=" w-[50%] h-[50%] flex justify-center items-center ">
        <Image
          src={Expired}
          alt="Session_Expired_Image"
          height={400}
          width={400}
          className=" object-cover"
        />
      </div>
      <div className=" w-[80%]  mx-auto md:mt-10">
        <h1 className=" text-center text-primary font-bold text-2xl md:text-3xl  ">
          Timed Out
        </h1>
        <p className=" text-center text-xs md:text-sm   text-text-light-gray my-3 md:my-6">
          You are being timed-out due to inactivity. Please choose to stay
          signed in or to logoff. Otherwise, you will log off automatically.
        </p>
        <button
          disabled={loading}
          onClick={() => {
            if (setLoading) {
              setLoading(true);
            }

            setTimeout(() => {
              toast.success("Welcome Back", {
                description: "Session has been reset.",
                duration: 4000,
              });

              handleClick?.();
            }, 2000);
          }}
          className={`mt-6 md:mt-3 text-xs ${
            loading ? "bg-transparent" : "bg-primary text-white"
          }  px-6 py-2 cursor-pointer flex justify-self-center`}
        >
          {loading ? <ButtonLoader /> : "Try Again"}
        </button>
      </div>

      <Image
        src={Expired2}
        alt="Expired_Image"
        width={100}
        height={100}
        className=" absolute bottom-0 -right-0"
      />
    </div>
  );
};

export default UserInactivity;
