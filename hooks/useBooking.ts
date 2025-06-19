import { BookingContext } from "@/context/BookingContext";
import { useContext } from "react";

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }

  return context;
}
