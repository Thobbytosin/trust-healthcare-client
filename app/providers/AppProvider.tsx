"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import SearchProvider from "./SearchProvider";
import BookingProvider from "./BookingProvider";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <SearchProvider>
        <BookingProvider>{children}</BookingProvider>
      </SearchProvider>
    </QueryProvider>
  );
};

export default AppProvider;
