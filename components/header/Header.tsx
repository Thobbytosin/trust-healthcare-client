"use client";
import React, { FC, useEffect, useState } from "react";
import NavLaptop from "../navbar/NavLaptop";
import NavMobile from "../navbar/NavMobile";
import Modal from "../ui/Modal";

type Props = {
  activeIndex?: number;
};

const Header: FC<Props> = ({ activeIndex }) => {
  const [sticky, setSticky] = useState<"top" | "hide" | "show">("top");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("signup");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setSticky("show");
      } else if (window.scrollY > 0 && window.scrollY < 220) {
        setSticky("hide");
      } else if (window.scrollY === 0) {
        setSticky("top");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Call once in case the user reloads at a scrollY > 0
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 w-full left-0  transition-all duration-500 z-30 ${
        sticky === "top" && "shadow-none"
      } ${sticky === "hide" && "-translate-y-[6rem] z-30"} ${
        sticky === "show" &&
        "-translate-y-0 bg-white shadow-md md:shadow-lg z-30"
      }`}
    >
      <NavLaptop
        activeIndex={activeIndex}
        setOpenModal={setOpenModal}
        setMode={setMode}
      />
      <NavMobile />
      {openModal && (
        <Modal mode={mode} setOpenModal={setOpenModal} setMode={setMode} />
      )}
    </header>
  );
};

export default Header;
