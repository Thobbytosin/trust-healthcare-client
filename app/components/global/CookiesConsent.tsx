"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const CookiesConsent = (props: Props) => {
  const [visible, setVisible] = useState(false);

  //   check if user has already consented to cookies
  useEffect(() => {
    const consent = localStorage.getItem("consent");
    if (!consent) {
      setVisible(true);
    }

    // localStorage.clear();
  }, []);

  const handleAction = (choice: "accepted" | "declined") => {
    localStorage.setItem("consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className=" fixed inset-0 z-50 flex justify-center items-center">
      {/* Overlah */}
      <div className=" fixed inset-0 bg-black/50 backdrop-blur-lg w-screen h-screen " />
      <section className=" w-full  bg-white p-5 z-60 flex flex-col items-center">
        <h2 className="text-center font-semibold text-2xl md:text-3xl lg:text-4xl my-4 lg:my-8">
          Cookies
        </h2>
        <p className=" text-xs sm:text-sm md:text-md lg:text-lg mb-2 md:mb-0 max-w-[80%] text-center text-black">
          We use cookies to improve your browsing experience on our website, to
          show you personalized content and analytic purposes. By continuing to
          use our site, you agree to our use of cookies.
        </p>
        <div className=" flex gap-4 my-4 md:my-8">
          <button
            type="button"
            title="Accept Cookies"
            aria-label="accept cookies"
            onClick={() => handleAction("accepted")}
            className="cursor-pointer bg-primary hover:bg-primary/50 transition-all duration-400 text-white px-3 md:px-6 py-1.5 md:py-3 rounded-md text-sm md:text-md"
          >
            Accept
          </button>
          <button
            type="button"
            title="Decline Cookies"
            aria-label="decline cookies"
            onClick={() => handleAction("declined")}
            className="cursor-pointer bg-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-400 text-black  px-3 md:px-6 py-1.5 md:py-3  rounded-md text-sm md:text-md"
          >
            Decline
          </button>
        </div>
      </section>
    </section>
  );
};

export default CookiesConsent;
