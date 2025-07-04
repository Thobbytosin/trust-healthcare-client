import React, { useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import { useAuthMutations } from "@/hooks/api/auth.api";

type Props = {
  setMode: (value: string) => void;
};

type ForgotForm = {
  email: string;
};

const ForgotPassword = ({ setMode }: Props) => {
  const { forgotPasswordDomain } = useAuthMutations();
  const { forgotPassword, forgotPasswordLoading, forgotPasswordSuccess } =
    forgotPasswordDomain;
  const [form, setForm] = useState<ForgotForm>({ email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(form);
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      setMode("reset-password");
    }
  }, [forgotPasswordSuccess]);

  return (
    <section className=" w-full md:w-[80%] mx-auto p-8 flex flex-col justify-center items-center overflow-clip relative font-poppins">
      {forgotPasswordLoading && <Loader />}

      <h2 className=" text-text-primary text-center text-2xl font-medium ">
        Forgot Password
      </h2>
      <p className=" text-sm text-grayey font-light text-center mt-1 font-comfortaa">
        Enter your email to help reset your password.
      </p>
      <form onSubmit={handleSubmit} className=" w-full mt-10">
        {/* email */}

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

        {/* button */}
        <button
          type="submit"
          className="my-6 mx-auto flex justify-self-center w-full py-2 bg-primary text-white text-center rounded-lg cursor-pointer justify-center text-sm transition-all duration-700 hover:bg-transparent hover:text-primary hover:border hover:border-primary outline-none "
        >
          Submit
        </button>
      </form>

      <button
        title="Back to sign in"
        aria-label="Back to sign in"
        type="button"
        onClick={() => setMode("login")}
        className=" mt-4 cursor-pointer text-primary underline font-medium"
      >
        Back to Sign in
      </button>
    </section>
  );
};

export default ForgotPassword;
