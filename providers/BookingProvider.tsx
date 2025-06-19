import { useBookingReducer } from "@/hooks/useBookingReducer";
import { ReactNode } from "react";
import { BookingContext } from "@/context/BookingContext";

type Props = {
  children: ReactNode;
};
export default function BookingProvider({ children }: Props) {
  const value = useBookingReducer();

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
