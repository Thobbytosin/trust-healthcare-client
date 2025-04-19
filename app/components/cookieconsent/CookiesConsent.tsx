"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

type Props = {};

const ConsentModal = dynamic(() => import("./ConsentModal"), {
  ssr: false,
});

const CookiesConsent = (props: Props) => {
  const [closeAll, setCloseAll] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  //   check if user has already consented to cookies
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setCloseAll(false);
    }
  }, []);

  const handleAction = (choice: "accepted" | "declined" | "managed") => {
    if (choice === "accepted") {
      localStorage.setItem(
        "cookie_consent",
        JSON.stringify({
          necessary: true,
          advertising: true,
          tracking: true,
        })
      );
      setCloseAll(true);
    } else if (choice === "declined") {
      localStorage.setItem(
        "cookie_consent",
        JSON.stringify({
          necessary: false,
          advertising: false,
          tracking: false,
        })
      );
      setCloseAll(true);
    } else {
      setOpenModal(true); // open the mgmt modal
    }
  };

  if (closeAll) return null;

  return (
    <section className=" fixed inset-0 z-50 flex justify-center items-center ">
      {/* Overlay */}
      <div className=" fixed inset-0 bg-black/15 w-screen h-screen backdrop-blur-sm " />
      <section className=" fixed right-10 bottom-10 w-[600px] h-fit bg-white 0 p-6  z-60 rounded-xl  shadow-black/60 shadow-lg">
        <h2 className=" font-semibold mb-6 text-2xl text-left">
          We use cookies
        </h2>
        <p className=" text-sm  mb-2 md:mb-0  text-start text-black leading-8">
          This website uses cookies and other tracking technologies to improve
          your browsing experience for the following purposes: to enable basic
          functionality of the website, to provide a better experience on the
          website, to measure your interest in our products and services and to
          personalize marketing interactions, to deliver ads that are more
          relevant to you.
        </p>
        <div className="flex my-4 md:my-8 w-full justify-between">
          <div className=" flex ">
            <button
              type="button"
              title="Accept Cookies"
              aria-label="accept cookies"
              onClick={() => handleAction("accepted")}
              className="cursor-pointer bg-primary hover:bg-primary/50 transition-all duration-400 text-white px-3 md:px-6 py-1.5  text-sm md:text-md"
            >
              Accept all
            </button>
            <button
              type="button"
              title="Decline Cookies"
              aria-label="decline cookies"
              onClick={() => handleAction("declined")}
              className="cursor-pointer bg-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-400 text-black  px-3 md:px-6 py-1.5 text-sm md:text-md ml-2"
            >
              Reject all
            </button>
          </div>
          <button
            type="button"
            title="Manage Cookies"
            aria-label="manage cookies"
            onClick={() => handleAction("managed")}
            className="cursor-pointer text-primary underline transition-all duration-400  text-sm md:text-md "
          >
            Manage Cookies
          </button>
        </div>
      </section>

      {/* open modal */}
      {openModal ? (
        <div className=" w-screen h-screen bg-black/15 backdrop-blur-sm z-100 flex justify-center items-center">
          <ConsentModal setOpen={setOpenModal} setCloseAll={setCloseAll} />
        </div>
      ) : null}
    </section>
  );
};

export default CookiesConsent;
