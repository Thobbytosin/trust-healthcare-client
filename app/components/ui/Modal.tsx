import React, { FC } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import doctors from "../../../public/assets/doctors.png";
import Image from "next/image";
import Verification from "../auth/Verification";
import VerificationSuccess from "../auth/VerificationSuccess";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

type Props = {
  mode: string;
  setOpenModal: (value: boolean) => void;
  setMode: (value: string) => void;
};

const Modal: FC<Props> = ({ mode, setOpenModal, setMode }) => {
  return (
    <section className=" bg-yellow-400 ">
      <div
        onClick={() => setOpenModal(false)}
        className=" bg-black/50 fixed left-0 top-0 w-screen min-h-[300vh]  scrollbar-hide"
      />
      <div className="  bg-white absolute  top-[20px] md:top-[50px] h-fit md:h-[550px] left-[5%] w-[90%] xl:left-[15%] xl:w-[70%] md:left-[7.5%] md:max-w-[85%] z-20 rounded-3xl md:flex items-center overflow-hidden">
        <div className=" lg:block md:flex justify-end items-end md:w-[250px] xl:w-[548px] h-[10px] w-full md:h-full bg-primary rounded-tl-3xl rounded-bl-3xl relative overflow-clip md:p-6">
          {/* logo */}
          <div className="hidden absolute left-6 top-6 w-10 h-10 rounded-full md:flex justify-center items-center bg-gray-100 shadow shadow-black">
            <Image
              src={"/logo.png"}
              alt="trust_healthcare_logo"
              width={30}
              height={30}
            />
          </div>
          {/* text */}
          <h2 className=" hidden md:block text-white  lg:text-2xl lg:text-center max-w-[300px] mx-auto mt-20">
            We care about your health.
          </h2>
          <div className=" absolute bottom-0 left-0 w-full h-[200px] bg-linear-to-b from-transparent to-primary/40 z-10" />
          <Image
            src={doctors}
            alt="doctors_image"
            className="lg:block hidden absolute -bottom-2 -right-1 object-cover  "
          />
        </div>

        <div className=" w-full md:min-h-fit overflow-hidden ">
          {mode === "signup" && <Signup setMode={setMode} />}
          {mode === "login" && (
            <Login setMode={setMode} setOpenModal={setOpenModal} />
          )}
          {mode === "verification" && <Verification setMode={setMode} />}
          {mode === "verification-success" && (
            <VerificationSuccess setMode={setMode} />
          )}
          {mode === "forgot-password" && <ForgotPassword setMode={setMode} />}
          {mode === "reset-password" && <ResetPassword setMode={setMode} />}
        </div>
      </div>
    </section>
  );
};

export default Modal;
