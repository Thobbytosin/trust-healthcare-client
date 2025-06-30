import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import phoneIcon from "@/public/assets/phone.png";
import Loader from "../loaders/Loader";
import { useAuthMutations } from "@/hooks/api/auth.api";

type Props = {
  setMode: (value: string) => void;
};

type VerificationNumbers = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const Verification: FC<Props> = ({ setMode }) => {
  const { verifyAccountDomain, resendCodeDomain } = useAuthMutations();
  const { verifyAccount, verifyAccountLoading, verifyAccountSuccess } =
    verifyAccountDomain;
  const { resendCode, resendCodeLoading } = resendCodeDomain;

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verificationNumbers, setVerificationNumbers] =
    useState<VerificationNumbers>({
      "0": "",
      "1": "",
      "2": "",
      "3": "",
      "4": "",
      "5": "",
    });
  const [verificationLength, setVerificationLength] = useState(0);

  // change input
  const handleChange = (index: number, value: string) => {
    // Only accept digits 0-9
    if (!/^\d$/.test(value)) return;

    const newVerificationNumbers = { ...verificationNumbers, [index]: value };
    // console.log(newVerificationNumbers);
    setVerificationNumbers(newVerificationNumbers);

    if (value !== "" && value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    } else if (value === "" && index > 0 && index <= 5) {
      inputRefs[index - 1].current?.focus();
    } else if (index === 0) {
      inputRefs[0].current?.focus();
    }
  };

  // for keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = index.toString() as keyof VerificationNumbers;

    if (e.key === "Backspace") {
      if (verificationNumbers[key]) {
        const newVerificationNumbers = { ...verificationNumbers, [index]: "" };
        setVerificationNumbers(newVerificationNumbers);
      } else if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  // track the verification numbers lenght
  useEffect(() => {
    const verificationCode = Object.values(verificationNumbers).join("");
    setVerificationLength(verificationCode.length);
  }, [verificationLength, verificationNumbers]);

  // handle submit
  const handleSubmit = () => {
    const verificationCode = Object.values(verificationNumbers).join("");

    verifyAccount({ verificationCode });
  };

  // handle resend code
  const handleResend = () => {
    resendCode(null);
  };

  useEffect(() => {
    if (verifyAccountSuccess) {
      setMode("login");
    }
  }, [verifyAccountSuccess]);

  return (
    <section className=" w-full md:w-[80%] mx-auto p-8 flex flex-col justify-center items-center overflow-clip relative font-poppins">
      {(verifyAccountLoading || resendCodeLoading) && <Loader />}

      <h2 className=" text-text-primary text-center text-2xl font-medium mb-4 ">
        Account Verification
      </h2>
      <Image src={phoneIcon} alt="phone-icon" width={100} height={100} />
      <p className=" text-sm text-grayey font-light text-center mt-6 font-comfortaa">
        Enter the 6-digit verification code sent to your email.
      </p>
      <div className=" flex gap-2 justify-center  w-fit mt-6">
        {Object.keys(verificationNumbers).map(
          (
            key,
            index // arrays of keys ['0', '1', '2', '3',....]
          ) => (
            <input
              key={key}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              ref={inputRefs[index]} // bind to each value in the input ref array
              value={verificationNumbers[key as keyof VerificationNumbers]} // {"0": value, "1": value, ...}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className=" bg-gray-100 w-[40px] md:w-[50px] rounded-b-lg border-b-[2px] border-primary h-[50px] flex justify-center items-center text-center text-text-primary text-lg"
            />
          )
        )}
      </div>

      <button
        type="button"
        aria-label="Submit Verification"
        disabled={verificationLength !== 6}
        onClick={handleSubmit}
        className={` w-full py-3 text-sm  text-center rounded-lg  mt-10 md:mt-6 transition-all duration-500 font-poppins  ${
          verificationLength === 6
            ? "bg-primary text-white cursor-pointer hover:bg-transparent hover:text-primary border-primary hover:border"
            : " cursor-not-allowed bg-gray-200 text-text-primary opacity-80"
        }`}
      >
        Submit
      </button>
      <p className=" text-center text-sm md:text-base mt-8 font-comfortaa">
        Didn’t get the code?{" "}
        <button
          aria-label="Resend Button"
          type="button"
          onClick={handleResend}
          className=" inline cursor-pointer text-primary transition-all duration-500 hover:underline"
        >
          Resend
        </button>
      </p>

      <button
        title="Back to sign in"
        aria-label="Back to sign in"
        type="button"
        onClick={() => setMode("signup")}
        className=" mt-4 cursor-pointer text-primary underline font-medium font-poppins"
      >
        Back to Sign Up
      </button>
    </section>
  );
};

export default Verification;
