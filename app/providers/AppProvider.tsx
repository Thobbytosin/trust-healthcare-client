"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import SearchProvider from "./SearchProvider";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <SearchProvider>{children}</SearchProvider>
    </QueryProvider>
  );
};

export default AppProvider;
