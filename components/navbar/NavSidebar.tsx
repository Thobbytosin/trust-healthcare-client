import {
  ArrowRightAltIcon,
  ExpandLessOutlinedIcon,
  ExpandMoreOutlinedIcon,
  LogoutIcon,
  SearchOutlinedIcon,
} from "@/icons/icons";
import { useSidebarStore } from "@/store/useSidebarStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { menuItems, userMenuItems } from "@/constants";
import { getInitials } from "@/utils/helpers";

type Props = {
  setOpenSidebar: (value: boolean) => void;
  openSidebar: boolean;
};

const NavSidebar = ({ openSidebar, setOpenSidebar }: Props) => {
  const { user, userLoading } = useAuthStore((state) => state);
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("login");
  const setActivePage = useSidebarStore((state) => state.setActivePage);
  const activePage = useSidebarStore((state) => state.activePage);
  const [expandedDropdownId, setExpandedDropdownId] = useState<number | null>(
    null
  );
  const pathname = usePathname();
  const [showUserPopup, setShowUserPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  //   close the drop down when clicking anywhere
  useEffect(() => {
    const handleClickOutside: any = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowUserPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

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
        <div className="relative flex flex-col justify-between  bg-white h-full py-6 px-4 rounded-2xl">
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
                      if (item.dropdown) {
                        setExpandedDropdownId(
                          expandedDropdownId === index ? null : index
                        );
                      }
                    }}
                    className={`font-comfortaa font-medium w-full text-sm p-3 rounded-lg cursor-pointer ${
                      activePage === item?.link
                        ? "bg-primary text-white"
                        : "text-gray-900 hover:bg-gray-200 transition duration-500"
                    }`}
                  >
                    <Link
                      href={item.link || "#"}
                      className="flex items-center justify-between w-full"
                    >
                      <span className="flex items-center gap-2">
                        {activePage === item?.link
                          ? item.icon
                          : item.iconOutline}
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

          {/* user */}
          <div className=" bg-gray-100 w-full p-3 rounded-lg ">
            {userLoading ? (
              <div className=" flex gap-2 items-center">
                <div className=" w-10 h-10 rounded-full animate-pulse bg-gray-200" />
                <div className=" w-[70%] h-6 animate-pulse bg-gray-200" />
              </div>
            ) : user ? (
              <div
                onClick={() => setShowUserPopup(true)}
                className=" w-full flex items-center gap-2 cursor-pointer"
              >
                <div className="relative p-0.5 rounded-full bg-gradient-to-r from-primary to-secondary">
                  <div className="rounded-full w-8 h-8 bg-black flex justify-center items-center ">
                    <h3 className=" text-white text-center">
                      {getInitials(user.name)}
                    </h3>
                  </div>

                  <div className="online-indicator w-2 h-2 bg-green-500 border-1 border-white rounded-full absolute right-0 bottom-1" />
                </div>
                <p className=" text-[12px] font-comfortaa font-medium">
                  {user.name}
                </p>
              </div>
            ) : (
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
            )}
          </div>

          {/* user modal */}
          {showUserPopup && (
            <div
              ref={popupRef}
              className="w-[260px] h-fit bg-white shadow-lg shadow-gray-300 rounded-xl absolute left-8 bottom-4 p-2"
            >
              <div className=" flex items-start gap-2">
                <div className="relative p-0.5 rounded-full bg-gradient-to-r from-primary to-secondary">
                  <div className="rounded-full w-6 h-6 bg-black flex justify-center items-center ">
                    <h3 className=" text-white text-center text-[10px]">
                      {getInitials(user?.name || "")}
                    </h3>
                  </div>

                  <div className="online-indicator w-2 h-2 bg-green-500 border-1 border-white rounded-full absolute right-0 bottom-1" />
                </div>

                <div>
                  <h4 className=" font-poppins text-[12px] font-medium">
                    {user?.name}
                  </h4>
                  <p className=" font-comfortaa text-[10px] text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* divider */}
              <div className=" w-full h-[0.5px] bg-gray-300 my-3" />

              <ul className=" space-y-1">
                {userMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className=" w-full flex justify-between items-center cursor-pointer p-2 transition hover:bg-gray-100 "
                  >
                    <span className="flex items-center gap-2 font-comfortaa  text-xs ">
                      {item.icon}
                      {item.name}
                    </span>

                    {index === 1 && (
                      <span className=" w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </li>
                ))}
              </ul>

              {/* divider */}
              <div className=" w-full h-[0.5px] bg-gray-300 my-3" />

              <div>
                <span className="flex items-center gap-2 font-comfortaa cursor-pointer text-xs transition hover:bg-gray-100 p-2">
                  <LogoutIcon fontSize="small" color="inherit" />
                  Logout
                </span>
              </div>
            </div>
          )}
        </div>

        {/* right side close sidebar */}
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
