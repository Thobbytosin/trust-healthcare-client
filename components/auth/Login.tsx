import React, { FC, FormEvent, useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import {
  VisibilityOffOutlinedIcon,
  VisibilityOutlinedIcon,
} from "@/icons/icons";
import { useAuthMutations } from "@/hooks/api/auth.api";

type Props = {
  setMode: (value: string) => void;
  setOpenModal: (value: boolean) => void;
};

const Login: FC<Props> = ({ setMode, setOpenModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { loginDomain } = useAuthMutations();
  const { loginUser, loginUserLoading, loginSuccess } = loginDomain;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginUser(form);
  };

  useEffect(() => {
    if (loginSuccess) {
      setOpenModal(false);
    }
  }, [loginSuccess]);

  return (
    <section className=" w-full p-8 relative font-poppins">
      {loginUserLoading && <Loader />}
      <h2 className=" text-text-primary text-lg md:text-2xl font-medium font-poppins">
        Welcome Back
      </h2>
      <p className=" text-xs md:text-sm text-grayey font-light mb-8 md:mb-0 font-comfortaa">
        Sign in to access your account
      </p>

      <form onSubmit={handleLogin}>
        {/* email */}
        <div className="md:mt-8 mt-6 w-full ">
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

        {/* password */}
        <div className=" md:mt-8 mt-6 relative">
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
            onChange={handleChange}
            className="bg-[#F8F7F7] border border-[#DCD7D7] p-2 w-full rounded-lg text-sm outline-none text-[#9A9A9A]"
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

        {/* button */}
        <button
          type="submit"
          className="my-6 mx-auto flex justify-self-center w-[144px] py-2 bg-primary text-white text-center rounded-lg cursor-pointer justify-center text-sm transition-all duration-700 hover:bg-transparent hover:text-primary hover:border hover:border-primary "
        >
          Sign In
        </button>
      </form>
      <button
        type="button"
        title="Forgot Password"
        aria-label="Forgot Password"
        onClick={() => setMode("forgot-password")}
        className=" cursor-pointer flex justify-self-center mb-6 text-center text-primary font-normal md:text-base text-sm transition-all duration-700 hover:underline"
      >
        Forgot Password?
      </button>
      <p className=" text-center text-text-primary font-normal md:text-base text-sm">
        Not Registered?{" "}
        <button
          title="Sign Up"
          type="button"
          aria-label="Sign Up"
          className="inline cursor-pointer text-primary font-medium transition-all duration-700 hover:underline"
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </p>
    </section>
  );
};

export default Login;
