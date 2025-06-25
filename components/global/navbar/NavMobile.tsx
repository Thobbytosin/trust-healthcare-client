import Link from "next/link";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import Image from "next/image";
import { MenuIcon } from "@/icons/icons";
import NavSidebar from "./NavSidebar";

const NavMobile = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <nav
      aria-label="main navigation"
      className={`md:hidden flex ${styles.paddingX} ${styles.paddingY} w-full justify-between items-center font-poppins`}
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
          width={20}
          height={20}
        />
        <h1 className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
          <span className=" text-primary ">Trust</span> HealthCare
        </h1>
      </Link>

      <div className=" flex items-center gap-12">
        <button
          title="Menu"
          className=" cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        >
          <MenuIcon fontSize="medium" />
        </button>
      </div>

      {/* SIDEBAR SHOULD SHOW ONLY WHEN TOGGLE */}
      {/* mobile sidebar */}
      <NavSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
    </nav>
  );
};

export default NavMobile;
