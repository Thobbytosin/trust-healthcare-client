import {
  ArrowRightAltIcon,
  ContactSupportIcon,
  ContactSupportOutlinedIcon,
  ExpandLessOutlinedIcon,
  ExpandMoreOutlinedIcon,
  HomeIcon,
  HomeOutlinedIcon,
  MedicalServicesIcon,
  MedicalServicesOutlinedIcon,
  SearchOutlinedIcon,
  VaccinesIcon,
  VaccinesOutlinedIcon,
} from "@/icons/icons";
import { useSidebarStore } from "@/store/useSidebarStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";

type Props = {
  setOpenSidebar: (value: boolean) => void;
  openSidebar: boolean;
};

const menuItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon fontSize="small" color="inherit" />,
    iconOutline: <HomeOutlinedIcon fontSize="small" color="inherit" />,
  },
  {
    name: "Services",
    dropdown: ["Consultation", "Medical Check-up"],
    icon: <MedicalServicesIcon fontSize="small" color="inherit" />,
    iconOutline: (
      <MedicalServicesOutlinedIcon fontSize="small" color="inherit" />
    ),
  },

  {
    name: "Find Doctors",
    link: "/find-doctors",
    icon: <VaccinesIcon fontSize="small" color="inherit" />,
    iconOutline: <VaccinesOutlinedIcon fontSize="small" color="inherit" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <ContactSupportIcon fontSize="small" color="inherit" />,
    iconOutline: (
      <ContactSupportOutlinedIcon fontSize="small" color="inherit" />
    ),
  },
];

const NavSidebar = ({ openSidebar, setOpenSidebar }: Props) => {
  //   const [activeLink, setActiveLink] = useState<number>(0);
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("login");
  const setActivePageId = useSidebarStore((state) => state.setActivePageId);
  const activePageId = useSidebarStore((state) => state.activePageId);
  const [expandedDropdownId, setExpandedDropdownId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (openSidebar) {
      document.documentElement.classList.add("sidebar-open");
      document.body.classList.add("sidebar-open");
    } else {
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    }

    // Clean up if component unmounts
    return () => {
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    };
  }, [openSidebar]);

  return (
    <>
      <div
        id="sidebar"
        className={`fixed w-screen full-mobile-height full inset-0 z-40 transition duration-500 bg-black/40 flex  ${
          openSidebar ? "translate-x-[0%]" : "translate-x-[110%]"
        }`}
      >
        <div className="flex flex-col justify-between  bg-white h-full py-6 px-4 rounded-2xl">
          <div>
            <div className=" mb-8 w-full flex justify-between items-center">
              {/* logo */}
              <Link
                title="Trust HealthCare"
                href={"/"}
                className=" flex items-center gap-2"
              >
                <Image
                  src={"/logo.png"}
                  alt="trust_healthcare_logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-[16px] lg:text-[18px] font-semibold font-poppins">
                  <span className=" text-primary ">Trust</span> HealthCare
                </h1>
              </Link>
            </div>

            {/* search input */}
            <div className="  flex flex-row-reverse gap-2 items-center w-full p-2  text-gray-700 bg-gray-200 rounded-lg">
              <input
                type="search"
                placeholder="Search"
                className=" w-full border-0 outline-0 bg-transparent"
              />

              <SearchOutlinedIcon fontSize="small" color="inherit" />
            </div>

            {/* NAV LIST */}

            <ul
              className={`relative flex flex-col md:hidden items-center  cursor-pointer  w-full space-y-3  mt-6 `}
            >
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li
                    onClick={() => {
                      setActivePageId(index);
                      if (item.dropdown) {
                        setExpandedDropdownId(
                          expandedDropdownId === index ? null : index
                        );
                      }
                    }}
                    className={`font-comfortaa font-medium w-full text-sm p-3 rounded-lg cursor-pointer ${
                      activePageId === index
                        ? "bg-primary text-white"
                        : "text-gray-900 hover:bg-gray-200 transition duration-500"
                    }`}
                  >
                    <Link
                      href={item.link || "#"}
                      className="flex items-center justify-between w-full"
                    >
                      <span className="flex items-center gap-2">
                        {activePageId === index ? item.icon : item.iconOutline}
                        {item.name}
                      </span>

                      {item.dropdown ? (
                        expandedDropdownId ? (
                          <ExpandMoreOutlinedIcon
                            fontSize="small"
                            color="inherit"
                          />
                        ) : (
                          <ExpandLessOutlinedIcon
                            fontSize="small"
                            color="inherit"
                          />
                        )
                      ) : null}
                    </Link>
                  </li>

                  {/* Render dropdown if this item is expanded */}
                  {expandedDropdownId === index && item.dropdown && (
                    <ul className="w-full px-4">
                      {item.dropdown.map(
                        (subItem: string, subIndex: number) => (
                          <li
                            key={subIndex}
                            className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
                          >
                            <span className=" w-1 h-1 rounded-full bg-primary inline" />
                            {subItem}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>

          <div className=" bg-gray-100 w-full p-3 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setOpenModal(true);
                handleCloseSidebar();
              }}
              className=" cursor-pointer text-primary text-sm font-medium flex w-full gap-4 items-center"
            >
              <span> Get Started</span>
              <motion.span
                animate={{ x: [0, 15, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="ml-2"
              >
                <ArrowRightAltIcon fontSize="medium" color="inherit" />
              </motion.span>
            </button>
          </div>
        </div>

        <div
          className=" w-[40%] h-full bg-transparent"
          onClick={handleCloseSidebar}
        />
      </div>

      {openModal && (
        <Modal mode={mode} setOpenModal={setOpenModal} setMode={setMode} />
      )}
    </>
  );
};

export default NavSidebar;
