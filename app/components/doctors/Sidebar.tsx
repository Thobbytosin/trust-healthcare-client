/* eslint-disable react-hooks/exhaustive-deps */
import { IDoctor } from "@/app/store/useDoctorsStore";
import React, { FC, useEffect, useState } from "react";

type Props = {
  location: string | undefined;
  doctorsData: IDoctor[];
  setActiveSpecialization: (value: string) => void;
  setSearched: (value: boolean) => void;
  searched: boolean;
  handleFilterChange: (value: string) => any;
};

const Sidebar: FC<Props> = ({
  location,
  doctorsData,
  setActiveSpecialization,
  searched,
  setSearched,
  handleFilterChange,
}) => {
  const [locationData, setLocationData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  // handle filter doctors
  const handleFilterDoctors = () => {
    setLoading(true);
    setSearched(false);

    // Simulate an async task (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
      setSearched(true);

      const destructureLocation = location?.trim().toLowerCase().split(",");

      if (destructureLocation) {
        const lga = destructureLocation[0];
        const city = destructureLocation[1];

        const filteredDoctors: any = doctorsData?.filter(
          (doctor: any) =>
            doctor.clinicAddress.toLowerCase().includes(lga) ||
            doctor.clinicAddress.toLowerCase().includes(city)
        );
        if (filteredDoctors.length) {
          handleFilterChange(lga);
          setLocationData(filteredDoctors);
        }
      }
    }, 3000);
  };

  // useEffect(() => {
  //   if (locationData.length) {
  //     setDoctorsData(locationData);
  //   }
  // }, [locationData]);

  return (
    <aside className=" w-full min-h-fit  right-0 md:sticky -top-[100px]  ">
      <div className=" bg-white rounded-lg min-h-fit w-full mb-6 p-4">
        <h3 className=" text-text-primary font-medium text-xs lg:text-sm">
          Search by current location to see doctors near you
        </h3>
        {locationData?.length ? (
          <p className=" font-light text-[#787887] text-xs mt-2">
            You are seeing results from{" "}
            <span className=" font-medium text-primary italic">{location}</span>
            :
          </p>
        ) : null}

        {/* // search results */}
        {searched ? (
          locationData?.length >= 1 ? (
            <p className="my-6 cursor-pointer font-normal text-xs bg-primary text-white block p-1">
              {locationData.length > 3
                ? `${locationData.length} or more doctors found`
                : `${locationData.length} ${
                    locationData.length > 1 ? "doctors" : "doctor"
                  } found`}
            </p>
          ) : (
            <p className="my-6 cursor-not-allowed font-normal text-xs bg-gray-200 text-text-primary block p-1">
              No doctor found
            </p>
          )
        ) : null}

        <button
          type="button"
          disabled={loading}
          onClick={handleFilterDoctors}
          className={` text-xs text-center lg:px-4 px-4 py-1 lg:py-1.5 rounded-full mt-6 flex justify-self-end ${
            location
              ? " cursor-pointer bg-primary text-white hover:opacity-80 transition-all duration-500"
              : "cursor-not-allowed text-text-primary opacity-50 bg-gray-200"
          }`}
        >
          {loading ? "Loading..." : "Yes, Search"}
        </button>
      </div>

      <div className=" bg-white h-[300px] p-4 rounded-lg">
        <div className=" bg-white w-full h-full bg-[url(../public//assets/banner.jpg)] bg-cover bg-center bg-no-repeat "></div>
      </div>
    </aside>
  );
};

export default Sidebar;
