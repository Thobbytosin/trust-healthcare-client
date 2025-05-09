import React, { useState } from "react";

type Props = {
  description: string;
  active: boolean;
  onToggle: () => void;
  label: string;
};

const CookieOption = ({ label, active, description, onToggle }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div key={label} className=" w-full mt-8 min-h-[150px]">
      <p className="leading-6 text-xs lg:text-sm">{description}</p>

      <div className=" flex items-center gap-14 mt-6">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(true)} // for mobile
          className=" relative flex items-center"
        >
          <button
            onClick={() => {
              onToggle();
              setTimeout(() => setShowTooltip(false), 2000);
            }}
            className={`relative w-10 h-5 cursor-pointer rounded-full transition-colors duration-300  ${
              active ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute left-0.5 top-0.5 transition-transform duration-300 ${
                active ? "translate-x-0" : "translate-x-5"
              }`}
            ></span>
          </button>
          <span className={`ml-2 text-sm ${active ? "text-green-500" : ""}`}>
            {active ? "On" : "Off"}
          </span>
          {/* tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-10 z-50">
              <div className="bg-black text-white text-xs px-3 py-1 rounded shadow-md relative whitespace-nowrap">
                {active
                  ? `Disable ${
                      label === "necessary"
                        ? "Necessary Cookie"
                        : label === "tracking"
                        ? "Tracking Cookie"
                        : label === "advertising"
                        ? "Advertising Cookie"
                        : "Location Cookie"
                    }`
                  : `Enable ${
                      label === "necessary"
                        ? "Necessary Cookie"
                        : label === "tracking"
                        ? "Tracking Cookie"
                        : label === "advertising"
                        ? "Advertising Cookie"
                        : "Location Cookie"
                    }`}
                {/* triangle */}
                <div className="absolute top-full left-6 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieOption;
