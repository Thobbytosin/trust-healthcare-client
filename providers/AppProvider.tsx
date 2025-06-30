"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import SearchProvider from "./SearchProvider";
import BookingProvider from "./BookingProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <SearchProvider>
        <BookingProvider>{children}</BookingProvider>
      </SearchProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors />
    </QueryProvider>
  );
};

export default AppProvider;
