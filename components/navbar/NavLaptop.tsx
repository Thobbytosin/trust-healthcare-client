import Link from "next/link";
import { styles } from "@/styles/styles";
import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { getInitials } from "@/utils/helpers";
import {
  ExpandMoreOutlinedIcon,
  NotificationsIcon,
  SettingsIcon,
} from "@/icons/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { menuItems } from "@/constants";

type Props = {
  setOpenModal: (value: boolean) => void;
  setMode: (value: string) => void;
  activeIndex?: number;
};

const NavLaptop: FC<Props> = ({ setOpenModal, setMode, activeIndex }) => {
  const { user, userLoading } = useAuthStore((state) => state);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (name: string) => {
    const item = menuItems.find((item) => item.name === name);
    if (item?.dropdown) {
      setActiveDropdown(name);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  //   close the drop down when clicking anywhere
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       navRef.current &&
  //       !navRef.current.contains(event.target as Node) &&
  //       dropDownRef.current &&
  //       !dropDownRef.current.contains(event.target as Node)
  //     ) {
  //       setDropDownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <nav
      aria-label="main navigation"
      className={`hidden md:flex ${styles.paddingX} ${styles.paddingY} w-full justify-between items-center font-poppins`}
    >
      {/* logo */}
      <Link
        title="Trust HealthCare"
        href={"/"}
        className=" flex items-center gap-2"
      >
        <Image
          src={"/logo.png"}
          alt="trust_healthcare_logo"
          width={30}
          height={30}
        />
        <h1 className="text-[14px] lg:text-[18px] font-semibold">
          <span className=" text-primary ">Trust</span> HealthCare
        </h1>
      </Link>

      {/* nav links */}
      <ul
        className=" hidden md:flex items-center gap-4 text-[12px] md:text-[14px] cursor-pointer font-medium font-poppins"
        ref={navRef}
      >
        {menuItems.map((item, index) => (
          <li
            key={item.name}
            onMouseEnter={() => handleMouseEnter(item.name)}
            className="relative font-semibold"
          >
            <Link
              href={item.link || "#"}
              className={`text-[#1F2533]  hover:text-primary transition flex items-end ${
                activeIndex === index ? " text-primary" : ""
              }`}
            >
              <span>{item.name}</span>
              {item.name && item.dropdown && (
                <ExpandMoreOutlinedIcon fontSize="small" color="inherit" />
              )}
            </Link>

            {/* Dropdown */}
            {activeDropdown === item.name && item.dropdown && (
              <ul
                onMouseLeave={handleMouseLeave}
                className="absolute top-full mt-2 bg-white shadow-gray-500 rounded shadow-sm py-2 w-48 z-10"
              >
                {item.dropdown.map((subItem) => (
                  <li key={subItem}>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* check if user has logged in */}
      {userLoading ? (
        // SKELETON
        <div className="flex gap-4">
          <div className="hidden md:block w-[100px] h-[30px] rounded-lg bg-gray-200 animate-pulse" />
          <div className="hidden md:block w-[100px] h-[30px] rounded-lg bg-gray-200 animate-pulse" />
        </div>
      ) : user ? (
        <div className=" flex items-center gap-6 lg:gap-8">
          <div className=" flex items-center gap-4 lg:gap-6">
            <div className=" text-gray-500 cursor-pointer relative">
              <span className=" absolute top-0.5 right-0.5 flex justify-center items-center bg-red-500 rounded-full w-2 h-2 border-1 border-white "></span>
              <NotificationsIcon fontSize="small" color="inherit" />
            </div>

            <div className=" text-gray-500 cursor-pointer">
              <SettingsIcon fontSize="small" color="inherit" />
            </div>
          </div>

          <button
            aria-label="User Account"
            className=" cursor-pointer flex items-center "
          >
            <div className="relative p-0.5 rounded-full bg-gradient-to-r from-primary to-secondary">
              <div className="rounded-full w-8 h-8 bg-black flex justify-center items-center ">
                <h3 className=" text-white text-center">
                  {getInitials(user.name)}
                </h3>
              </div>

              <div className="online-indicator w-2 h-2 bg-green-500 border-1 border-white rounded-full absolute right-0 bottom-1" />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            title="Sign In"
            aria-label="Sign In"
            className="hidden md:block w-[140px] bg-primary text-center py-2 rounded-lg text-white text-[13px] cursor-pointer transition-all duration-500 hover:bg-primary/70"
            onClick={() => {
              setMode("login");
              setOpenModal(true);
            }}
          >
            Sign In
          </button>
          <button
            title="Sign Up"
            aria-label="Sign Up"
            className="hidden lg:block w-[140px] border-primary border text-center py-2 rounded-lg text-primary text-[13px] cursor-pointer transition-all duration-500 hover:bg-gray-300 hover:border-none"
            onClick={() => {
              setMode("signup");
              setOpenModal(true);
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavLaptop;
