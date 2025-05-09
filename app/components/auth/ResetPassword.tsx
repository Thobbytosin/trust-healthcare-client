import { useMutateData } from "@/hooks/useApi";
import {
  CloseOutlinedIcon,
  DoneOutlinedIcon,
  VisibilityOffOutlinedIcon,
  VisibilityOutlinedIcon,
} from "@/icons/icons";
import React, { useState } from "react";
import { toast } from "sonner";
import Loader from "../global/loaders/Loader";
import { RESETPASSWORD } from "@/config/user.endpoints";

type Props = {
  setMode: (value: string) => void;
};

type ResetForm = {
  resetCode: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ setMode }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<ResetForm>({
    password: "",
    resetCode: "",
    confirmPassword: "",
  });
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordChanging(true);

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { mutate: resetPassword, isPending } = useMutateData({
    method: "POST",
    mutationKey: ["resetPassword"],
    url: RESETPASSWORD,
  });

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    resetPassword(
      { resetCode: form.resetCode, password: form.password },
      {
        onSuccess: (data: any) => {
          toast.success("Password Reset Successful", {
            description: data.message,
            duration: 4000,
          });

          setMode("login");
        },
        onError: (error: any) => {
          toast.error(`Oops! ${error.response.data.message}`, {
            description: "Something went wrong. Try again",
            // duration: 20000,
          });
        },
      }
    );
  };

  return (
    <section className=" w-full  mx-auto p-8 flex flex-col justify-center items-center overflow-clip relative">
      {isPending && <Loader />}
      <h2 className=" text-text-primary text-center text-2xl font-medium ">
        Reset Password
      </h2>
      <p className=" text-sm text-grayey font-light text-center mt-1">
        Enter the reset code sent to your email and your new password to set a
        new password.
      </p>

      <form onSubmit={handleReset} className=" w-full mt-6">
        {/* reset code */}
        <div>
          <label
            htmlFor="resetCode"
            className="block text-sm text-text-primary font-medium mb-1"
          >
            Reset Code
          </label>
          <input
            aria-label="reset code"
            id="resetCode"
            name="resetCode"
            type="text"
            placeholder="Reset Code"
            required
            onChange={handleChange}
            className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full  rounded-lg text-sm outline-none text-[#9A9A9A]"
          />
        </div>
        {/* password and confirm password */}
        <div className=" w-full">
          {/* password */}
          <div className=" md:mt-6 mt-4 relative">
            <label
              htmlFor="password"
              className="block text-sm text-text-primary font-medium mb-1"
            >
              New Password
            </label>
            <input
              aria-label="password input"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              required
              onChange={handlePasswordChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full  rounded-lg text-sm outline-none text-[#9A9A9A]"
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
          <div className=" md:mt-6 mt-4 relative">
            <label
              htmlFor="firstName"
              className="block text-sm text-text-primary font-medium mb-1"
            >
              New Confirm Password
            </label>
            <input
              aria-label="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="New Confirm Password"
              required
              onChange={handlePasswordChange}
              className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full   rounded-lg text-sm outline-none text-[#9A9A9A]"
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

        {/* button */}
        <button
          type="submit"
          className={`my-6 mx-auto flex justify-self-center w-full py-2  text-center rounded-lg  justify-center text-sm   ${
            form?.password?.length >= 8 &&
            form?.password === form?.confirmPassword &&
            form?.password?.match(/[a-zA-Z]/) &&
            form?.password?.match(/[0-9]/) &&
            form?.resetCode?.trim().length >= 1
              ? "cursor-pointer bg-primary text-white hover:text-primary hover:border hover:border-primary transition-all duration-700 hover:bg-transparent "
              : "cursor-not-allowed bg-gray-300 opacity-50"
          }`}
        >
          Submit
        </button>
      </form>

      <button
        title="Back to sign in"
        aria-label="Back to sign in"
        type="button"
        onClick={() => setMode("login")}
        className=" mt-2 cursor-pointer text-primary underline font-medium"
      >
        Back to Sign in
      </button>
    </section>
  );
};

export default ResetPassword;
