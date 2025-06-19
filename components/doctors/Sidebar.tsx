"use client";

import React, { FC } from "react";
import SearchUserLocation from "../global/search/SearchUserLocation";

type Props = {};

const Sidebar: FC<Props> = () => {
  return (
    <aside className=" w-full min-h-fit  right-0 md:sticky -top-[100px]  ">
      <div className=" md:block hidden">
        <SearchUserLocation />
      </div>

      <div className=" bg-white h-[300px] p-4 rounded-lg">
        <div className=" bg-white w-full h-full bg-[url(../public/assets/banner.jpg)] bg-cover bg-center bg-no-repeat "></div>
      </div>
    </aside>
  );
};

export default Sidebar;
