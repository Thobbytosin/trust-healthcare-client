import Link from "next/link";
import { styles } from "../../../styles/styles";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getInitials } from "../../../../app/utils/helpers";
import { ExpandMoreOutlinedIcon } from "../../../../app/icons/icons";
import { useAuth } from "../../../../app/context/AuthContext";

type Props = {
  setOpenModal: (value: boolean) => void;
  setMode: (value: string) => void;
  activeIndex?: number;
};

const menuItems = [
  { name: "Home", link: "/" },
  {
    name: "Services",
    submenu: [
      { name: "Consultation", link: "/services/consultation" },
      { name: "Medical Checkup", link: "/services/medical-check-up" },
    ],
  },

  { name: "Find Doctors", link: "/find-doctors" },
  { name: "Contact", link: "/contact" },
];

const NavLaptop: FC<Props> = ({ setOpenModal, setMode, activeIndex }) => {
  const { user } = useAuth();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const [activeFocusedIndex, setActiveFocusedIndex] = useState<any>(0);

  // handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement | HTMLButtonElement>
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveFocusedIndex((prev: any) =>
        prev < menuItems.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveFocusedIndex((prev: any) =>
        prev > 0 ? prev - 1 : menuItems.length - 1
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (menuItems[activeFocusedIndex].submenu) {
        setDropDownOpen(true);
      } else {
        window.location.href = menuItems[activeFocusedIndex].link as string;
      }
    } else if (event.key === "ArrowDown" && dropDownOpen) {
      event.preventDefault();
      dropDownRef.current?.querySelector("a")?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDropDownOpen(false);
    }
  };

  //   close the drop down when clicking anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          className=" w-auto h-auto"
        />
        <h1 className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
          <span className=" text-primary ">Trust</span> HealthCare
        </h1>
      </Link>

      {/* nav links */}
      <ul
        className=" hidden md:flex items-center gap-4 text-[14px] cursor-pointer font-medium"
        onKeyDown={handleKeyDown}
        ref={navRef}
      >
        {menuItems.map((item, index) =>
          item.submenu ? (
            <li key={index} className={`focus:outline-none relative`}>
              <button
                title="Services"
                aria-haspopup="true"
                aria-expanded={dropDownOpen}
                onClick={() => setDropDownOpen(true)}
                onMouseEnter={() => {
                  setDropDownOpen(!dropDownOpen);
                  setActiveFocusedIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveFocusedIndex(undefined);
                }}
                className={`flex items-center cursor-pointer hover:text-primary ${
                  (!activeIndex && activeFocusedIndex === index) ||
                  activeIndex === index
                    ? "border-b-2 border-primary"
                    : ""
                } duration-300 transition-all`}
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropDownOpen && (
                <ul
                  ref={dropDownRef}
                  role="menu"
                  onMouseLeave={() => setDropDownOpen(!dropDownOpen)}
                  className=" absolute left-0 bg-gray-200 rounded-md w-40 shadow-lg shadow-black/10 text-text-primary mt-2 cursor-pointer transition-all duration-700"
                >
                  {item.submenu.map((subitem, i) => (
                    <li
                      key={i}
                      role="menuitem"
                      title={subitem.name}
                      className={`p-2.5 transition-all duration-700 hover:bg-white hover:text-black w-full text-sm font-light ${
                        i === item.submenu.length - 1
                          ? "border-none"
                          : "border-b border-white"
                      }`}
                    >
                      <Link href={subitem.link}>{subitem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={index} className="">
              <Link
                href={item.link}
                title={item.name}
                onClick={() => {
                  setDropDownOpen(false);
                  setActiveFocusedIndex(index);
                }}
                className={`focus:outline-none hover:text-primary transition-all ${
                  (!activeIndex && activeFocusedIndex === index) ||
                  activeIndex === index
                    ? "border-b-2 border-primary"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* check if user has logged in */}
      {user ? (
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

            <div className="online-indicator w-2 h-2 bg-green-500 rounded-full absolute right-0 top-1" />
          </div>

          <ExpandMoreOutlinedIcon fontSize="small" />
        </button>
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
