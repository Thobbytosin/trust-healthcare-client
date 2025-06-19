import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  setOpen: (value: boolean) => void;
  setShowConsent: (value: boolean) => void;
};

const cookiesOptions = [
  { id: 1, name: "Necessary Cookies" },
  { id: 2, name: "Tracking Cookies" },
  { id: 3, name: "Advertising Cookies" },
  { id: 4, name: "Location Cookies" },
];

const CookieOption = dynamic(() => import("./CookieOption"), {
  ssr: false,
});

const ConsentModal = ({ setOpen, setShowConsent }: Props) => {
  const [activeCookie, setActiveCookie] = useState(1);
  const [hasChanged, setHasChanged] = useState(false);
  const [cookiePreference, setCookiePreference] = useState({
    necessary: true,
    advertising: true,
    tracking: true,
    location: true,
  });

  const handleToggle = (key: keyof typeof cookiePreference) => {
    setCookiePreference((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setHasChanged(true);
  };

  const handleSave = () => {
    // save to cookie
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60); // Expire in 60 days

    document.cookie = `cookie_consent=${JSON.stringify(
      cookiePreference
    )}; expires=${expiryDate.toUTCString()}; path=/;`;

    setHasChanged(false);
    setOpen(false);
    setShowConsent(false);

    toast.success("Cookie Preference Updated", {
      description: "Your preferences has been updated. Thanks",
      duration: 4000,
    });
  };

  return (
    <div className="w-[80%] h-[90vh] lg:h-[85vh] bg-white z-100 p-6 lg:overflow-hidden overflow-y-scroll">
      {/* NOTE */}
      <h2 className=" font-semibold text-base md:text-xl mb-3 md:mb-4 ">
        Your privacy is important to us
      </h2>
      <p className=" mb-4 md:mb-6 text-xs lg:text-sm leading-6 text-gray-500">
        Cookies are very small text files that are stored on your computer when
        you visit a website. We use cookies for a variety of purposes and to
        enhance your online experience on our website (for example, to remember
        your account login details). You can change your preferences and decline
        certain types of cookies to be stored on your computer while browsing
        our website. You can also remove any cookies already stored on your
        computer, but keep in mind that deleting cookies may prevent you from
        using parts of our website.
      </p>

      <h2 className=" font-semibold text-sm md:text-lg mb-3 md:mb-4">
        Manage your cookies preferences.
      </h2>

      <div className=" w-full block md:flex justify-between">
        {cookiesOptions.map((cookie, index: number) => (
          <button
            aria-label={`${cookie.name}-button`}
            title={`${cookie.name}-button`}
            key={index}
            onClick={() => setActiveCookie(cookie.id)}
            className={`w-full cursor-pointer lg:text-base text-sm py-1.5 font-medium px-3 mt-2 md:mt-0 ${
              activeCookie === cookie.id
                ? "bg-primary text-white"
                : " bg-gray-200"
            }`}
          >
            {cookie.name}
          </button>
        ))}
      </div>

      {activeCookie === 1 && (
        <CookieOption
          description="These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website. Without these cookies, we cannot provide you certain services on our website."
          label="necessary"
          active={cookiePreference.necessary}
          onToggle={() => handleToggle("necessary")}
        />
      )}

      {activeCookie === 2 && (
        <CookieOption
          description="These cookies are used to collect information to analyze the traffic to our website and how visitors are using our website. For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website for you. The information collected through these tracking and performance cookies do not identify any individual visitor."
          label="tracking"
          active={cookiePreference.tracking}
          onToggle={() => handleToggle("tracking")}
        />
      )}

      {activeCookie === 3 && (
        <CookieOption
          description={`These cookies are used to show advertising that is likely to be of interest to you based on your browsing habits. These cookies, as served by our content and/or advertising providers, may combine information they collected from our website with other information they have independently collected relating to your web browser's activities across their network of websites.${" "} \n\ If you choose to remove or disable these targeting or advertising cookies, you will still see adverts but they may not be relevant to you.`}
          label="advertising"
          active={cookiePreference.advertising}
          onToggle={() => handleToggle("advertising")}
        />
      )}
      {activeCookie === 4 && (
        <CookieOption
          description={`We value your privacy. To improve your experience, we request access to your location only if you allow it. This helps us show results near you. We'd like to use your location to help you find doctors and hospitals tailored to your needs, right around you. Your data stays private — we only use your location if you allow it`}
          label="location"
          active={cookiePreference.location}
          onToggle={() => handleToggle("location")}
        />
      )}

      {/*  */}
      <div className=" w-full flex justify-between items-center mt-8">
        {/* save preferences */}
        <button
          title="Save Preferences"
          aria-label="Save Preferences"
          disabled={!hasChanged}
          onClick={handleSave}
          className={`text-white  text-xs px-4 py-1.5 ${
            hasChanged
              ? "bg-primary cursor-pointer"
              : " cursor-not-allowed bg-gray-400"
          } rounded-full`}
        >
          Save Preferences
        </button>

        <button
          title="Close"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className=" bg-red-500 text-white cursor-pointer px-4 py-1 rounded-full w-fit text-center text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConsentModal;
