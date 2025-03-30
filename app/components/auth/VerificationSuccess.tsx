import { DoneOutlinedIcon } from "../../../app/icons/icons";
import React from "react";

type Props = {
  setMode: (value: string) => void;
};

const VerificationSuccess = ({ setMode }: Props) => {
  return (
    <section className="md:h-fit h-[370px] flex justify-center items-center flex-col">
      <div className=" w-20 h-20 border-2 border-secondary flex justify-center items-center text-secondary rounded-full">
        <DoneOutlinedIcon color="inherit" fontSize="large" />
      </div>
      <h3 className=" mt-2 text-text-primary font-medium  md:text-xl">
        Account Verification Success!
      </h3>
      <button
        type="button"
        aria-label="Back To Login"
        onClick={() => setMode("login")}
        className=" mt-8 w-[50%] bg-primary py-3 text-center text-white cursor-pointer transition-all duration-500 rounded-lg hover:bg-transparent hover:border hover:border-primary hover:text-primary text-xs md:text-base"
      >
        Back to Login
      </button>
    </section>
  );
};

export default VerificationSuccess;
