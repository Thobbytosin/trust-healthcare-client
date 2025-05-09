"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  setShowConsent: (value: boolean) => void;
};

const ConsentModal = dynamic(() => import("./ConsentModal"), {
  ssr: false,
});

const CookiesConsent = ({ setShowConsent }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger the animation on mount
    const timeout = setTimeout(() => setMounted(true), 10); // small delay ensures DOM is rendered
    return () => clearTimeout(timeout);
  }, []);

  const handleAction = (choice: "accepted" | "declined" | "managed") => {
    let consentData;
    if (choice === "accepted") {
      consentData = {
        necessary: true,
        advertising: true,
        tracking: true,
        location: true,
      };
      setShowConsent(false);

      toast.success("Cookie Preference Saved", {
        description: "You can update it anytime. Thanks",
        duration: 4000,
      });
    } else if (choice === "declined") {
      consentData = {
        necessary: false,
        advertising: false,
        tracking: false,
        location: false,
      };
      setShowConsent(false);
      toast.success("Cookie Preference Saved", {
        description: "You can update it anytime. Thanks",
        duration: 4000,
      });
    } else {
      setOpenModal(true); // open the mgmt modal
    }

    // save to cookie
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60); // Expire in 60 days

    document.cookie = `cookie_consent=${JSON.stringify(
      consentData
    )}; expires=${expiryDate.toUTCString()}; path=/;`;
  };

  return (
    <section className=" fixed inset-0 z-50 flex justify-center items-center ">
      {/* Overlay */}
      <div className=" fixed inset-0 bg-black/15 w-screen h-screen backdrop-blur-sm " />
      <section
        className={`fixed right-10 bottom-10 w-[600px] h-fit bg-white 0 p-6  z-60 rounded-xl  shadow-black/60 shadow-lg transition-transform duration-[1500ms] ease-in-out transform  ${
          mounted ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
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
      {openModal && (
        <div className=" w-screen h-screen bg-black/15 backdrop-blur-sm z-100 flex justify-center items-center">
          <ConsentModal
            setOpen={setOpenModal}
            setShowConsent={setShowConsent}
          />
        </div>
      )}
    </section>
  );
};

export default CookiesConsent;
