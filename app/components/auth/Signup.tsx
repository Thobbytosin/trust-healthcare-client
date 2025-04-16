import { useMutateData } from "@/app/hooks/useApi";
import {
  CloseOutlinedIcon,
  DoneOutlinedIcon,
  VisibilityOffOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../app/icons/icons";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Loader from "../global/Loader";

type Props = {
  setMode: (value: string) => void;
};

const Signup: FC<Props> = ({ setMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<any>({});
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { mutate: registerUser, isPending } = useMutateData<any>({
    mutationKey: ["registerUser"],
    method: "POST",
    url: "/signup",
    skipAuthRefresh: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordChanging(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordChanging(true);
    setIsChecked(false);

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerUser(
      {
        name: form.firstName.trim() + " " + form.lastName.trim(),
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: async (data: any) => {
          toast.success("Welcome to Trust Healthcare!", {
            description: data.message,
            duration: 4000,
          });

          setMode("verification");
        },
        onError: (error: any) => {
          toast.error(`${error.response.data.message}`, {
            description: "Something went wrong. Try again",
            duration: 4000,
          });
        },
      }
    );
  };

  return (
    <section className=" w-full h-[580px] overflow-y-scroll md:overflow-hidden px-8 py-4 md:py-12 relative">
      {isPending && <Loader />}

      <h2 className=" text-text-primary text-lg md:text-2xl font-medium">
        Register Your Account
      </h2>
      <p className=" text-xs md:text-sm text-grayey font-light">
        Sign up to create a new account
      </p>
      <form onSubmit={handleSubmit}>
        {/* first and last name */}
        <div className=" md:flex md:gap-10 justify-between mt-8 ">
          {/* first name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm text-text-primary font-medium mb-1"
            >
              First Name
            </label>
            <input
              aria-label="first name"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full md:w-[175px] lg:w-[205px] rounded-lg text-sm outline-none text-[#9A9A9A]"
            />
          </div>

          {/* last name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm text-text-primary font-medium mb-1 mt-4 md:mt-0"
            >
              Last Name
            </label>
            <input
              aria-label="last name"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              onChange={handleChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full  md:w-[175px] lg:w-[205px]  rounded-lg text-sm outline-none text-[#9A9A9A]"
            />
          </div>
        </div>

        {/* email */}
        <div className="md:mt-8 mt-4 w-full ">
          <label
            htmlFor="email"
            className="block text-sm text-text-primary font-medium mb-1"
          >
            Email Address
          </label>
          <input
            aria-label="email input"
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 rounded-lg text-sm outline-none text-[#9A9A9A] w-full"
          />
        </div>

        {/* password and confirm password */}
        <div className=" md:flex gap-10 justify-between ">
          {/* password */}
          <div className=" md:mt-8 mt-4 relative">
            <label
              htmlFor="password"
              className="block text-sm text-text-primary font-medium mb-1"
            >
              Password
            </label>
            <input
              aria-label="password input"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={handlePasswordChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full md:w-[175px] lg:w-[205px] rounded-lg text-sm outline-none text-[#9A9A9A]"
            />
            <>
              {showPassword ? (
                <button
                  type="button"
                  className=" cursor-pointer absolute right-2 bottom-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <VisibilityOutlinedIcon color="inherit" fontSize="small" />
                </button>
              ) : (
                <button
                  type="button"
                  className=" cursor-pointer absolute right-2 bottom-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <VisibilityOffOutlinedIcon color="inherit" fontSize="small" />
                </button>
              )}
            </>
          </div>

          {/* confirm password */}
          <div className=" md:mt-8 mt-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-text-primary font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              aria-label="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              onChange={handlePasswordChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full md:w-[175px] lg:w-[205px]  rounded-lg text-sm outline-none text-[#9A9A9A]"
            />
            <>
              {showConfirmPassword ? (
                <button
                  type="button"
                  className=" cursor-pointer absolute right-2 bottom-2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <VisibilityOutlinedIcon color="inherit" fontSize="small" />
                </button>
              ) : (
                <button
                  type="button"
                  className=" cursor-pointer absolute right-2 bottom-2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <VisibilityOffOutlinedIcon color="inherit" fontSize="small" />
                </button>
              )}
            </>
          </div>
        </div>

        {/* password authentication options */}
        {isPasswordChanging ? (
          <div className="mt-2">
            <span
              className={`block ${
                form?.password?.length >= 8 ? "text-green-600" : "text-red-500"
              } text-xs font-light`}
            >
              Password must at least be 8 characters
              {form?.password?.length >= 8 ? (
                <DoneOutlinedIcon fontSize="inherit" className="ml-4" />
              ) : (
                <CloseOutlinedIcon fontSize="inherit" className="ml-4" />
              )}
            </span>

            <span
              className={`block ${
                form?.password?.match(/[0-9]/)
                  ? "text-green-600"
                  : "text-red-500"
              } text-xs font-light`}
            >
              Password must contain at least 1 number
              {form?.password?.match(/[0-9]/) ? (
                <DoneOutlinedIcon fontSize="inherit" className="ml-4" />
              ) : (
                <CloseOutlinedIcon fontSize="inherit" className="ml-4" />
              )}
            </span>

            <span
              className={`block ${
                form?.password?.match(/[a-zA-Z]/)
                  ? "text-green-600"
                  : "text-red-500"
              } text-xs font-light`}
            >
              Password must contain at least 1 alphabet
              {form?.password?.match(/[a-zA-Z]/) ? (
                <DoneOutlinedIcon fontSize="inherit" className="ml-4" />
              ) : (
                <CloseOutlinedIcon fontSize="inherit" className="ml-4" />
              )}
            </span>

            <span
              className={`block ${
                form?.password === form?.confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
              } text-xs font-light`}
            >
              Password and Confirm Password must be equal
              {form?.password === form?.confirmPassword ? (
                <DoneOutlinedIcon fontSize="inherit" className="md:ml-4 ml-2" />
              ) : (
                <CloseOutlinedIcon
                  fontSize="inherit"
                  className="md:ml-4 ml-2"
                />
              )}
            </span>
          </div>
        ) : null}

        {/* terms and conditions */}
        {form?.password?.length >= 8 &&
          form?.password === form?.confirmPassword &&
          form?.password?.match(/[a-zA-Z]/) &&
          form?.password?.match(/[0-9]/) && (
            <div className=" flex items-center gap-4 mt-6">
              <div
                className={`w-[20px] h-[20px] border border-[#545454] cursor-pointer text-white flex justify-center items-center ${
                  isChecked ? "bg-primary" : "bg-transparent"
                }`}
                onClick={() => {
                  setIsPasswordChanging(false);
                  setIsChecked((prev) => !prev);
                }}
              >
                {isChecked && <DoneOutlinedIcon fontSize="small" />}
              </div>
              <p className="text-sm">
                I accept all{" "}
                <span className=" cursor-pointer text-primary">
                  terms and conditions
                </span>
              </p>
            </div>
          )}

        {/* button */}
        <button
          disabled={
            form?.password?.length < 8 ||
            form?.password !== form?.confirmPassword ||
            !form?.password?.match(/[a-zA-Z]/) ||
            !form?.password?.match(/[0-9]/)
          }
          type="submit"
          className={`mx-auto flex justify-self-center w-[144px] py-2  text-center rounded-lg my-4 ${
            form?.firstName?.trim().length > 1 &&
            form?.lastName?.trim().length > 1 &&
            form?.email?.trim().length > 1 &&
            form?.password?.length >= 8 &&
            form?.password === form?.confirmPassword &&
            form?.password?.match(/[a-zA-Z]/) &&
            form?.password?.match(/[0-9]/) &&
            isChecked
              ? "bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-primary hover:border hover:border-primary"
              : "cursor-not-allowed bg-gray-300 opacity-50"
          } justify-center text-sm  `}
        >
          Sign Up
        </button>
      </form>
      <p className=" text-center text-text-primary font-normal md:text-base text-sm">
        Already Have an Account?{" "}
        <span
          title="Log In"
          aria-label="Log In"
          onClick={() => setMode("login")}
          className=" cursor-pointer text-primary font-medium transition-all duration-700 hover:underline"
        >
          Log In
        </span>
      </p>
    </section>
  );
};

export default Signup;
