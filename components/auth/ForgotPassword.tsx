import React, { useState } from "react";
import Loader from "../global/loaders/Loader";
import { toast } from "sonner";
import { useMutateData } from "@/hooks/useApi";
import { FORGOTPASSWORD } from "@/config/user.endpoints";

type Props = {
  setMode: (value: string) => void;
};

type ForgotForm = {
  email: string;
};

const ForgotPassword = ({ setMode }: Props) => {
  const { mutate: forgotPassword, isPending } = useMutateData({
    method: "POST",
    mutationKey: ["forgotPassword"],
    url: FORGOTPASSWORD,
  });
  const [form, setForm] = useState<ForgotForm>({ email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(form, {
      onSuccess: (data: any) => {
        toast.success("Password Reset Token Sent", {
          description: data.message,
          duration: 4000,
        });

        setMode("reset-password");
      },
      onError: (error: any) => {
        toast.error(`${error.response.data.message}`, {
          description: "Something went wrong. Try again",
          duration: 4000,
        });
      },
    });
  };

  return (
    <section className=" w-full md:w-[80%] mx-auto p-8 flex flex-col justify-center items-center overflow-clip relative">
      {isPending && <Loader />}

      <h2 className=" text-text-primary text-center text-2xl font-medium ">
        Forgot Password
      </h2>
      <p className=" text-sm text-grayey font-light text-center mt-1">
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
