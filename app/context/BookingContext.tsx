"use client";

import { createContext } from "react";
import { useBookingReducer } from "@/hooks/useBookingReducer";

export type BookingContextType = ReturnType<typeof useBookingReducer>;

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);
