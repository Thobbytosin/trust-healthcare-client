import { useBooking } from "@/hooks/useBooking";
import { styles } from "@/styles/styles";
import React, { FormEvent, useState } from "react";
import SchedulePicker from "./SchedulePicker";

const appointmentTypes = ["Hospital Visitation", "Online Consultation"];

type Props = {};

const BookingForm = ({}: Props) => {
  const { bookingActions, bookingState } = useBooking();
  const { appointmentType } = bookingState;

  const [selectedSlots, setSelectedSlots] = useState<{
    [date: string]: { [doctorId: string]: { slot: string; session: string } };
  }>({});

  const handleBookAppointment = (e: FormEvent) => {
    e.preventDefault();

    if (selectedSlots) {
      bookingActions.setAppointmentTimeSlots(selectedSlots);
    }
  };

  return (
    <>
      <form
        // onSubmit={handleBookAppointment}
        className=" flex-1  flex flex-col space-y-8"
      >
        {/* appointment type */}
        <div>
          <label htmlFor="appointmentType" className={styles.bookingLabel}>
            Choose Appointment Type<span className=" text-red-500 ml-1">*</span>
          </label>

          <div className=" flex space-x-4 mt-2">
            {appointmentTypes.map((ap, i) => (
              <fieldset
                id="appointmentType"
                key={i}
                className={`flex items-center gap-1 ${
                  i == 0 ? "opacity-80 line-through cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="radio"
                  value={ap}
                  onChange={() => bookingActions.setAppointmentType(ap)}
                />
                <span className=" xl:text-xs text-[10px] text-grayey">
                  {ap}
                </span>
              </fieldset>
            ))}
          </div>
        </div>

        {/* appointment reason */}
        {/* <div>
          <label htmlFor="reason" className={styles.bookingLabel}>
            Reason <span className=" text-red-500 ml-3">*</span>
          </label>

          <textarea
            placeholder="State your reason.."
            onChange={(e) =>
              bookingActions.setAppointmentReason(e.target.value)
            }
            className=" mt-2 w-full p-2  focus:outline-0 focus:border focus:border-grayey min-h-[60px] leading-tight text-sm  resize-none border border-grayey rounded-lg "
          />
        </div> */}

        {/* appointment schedule picker */}

        <div className=" w-full min-w-0">
          <label htmlFor="reason" className={styles.bookingLabel}>
            Choose Appointment Time Slot{" "}
            <span className=" text-red-500 ml-1">*</span>
          </label>

          <SchedulePicker
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
          />
        </div>

        {/* button */}
        <div className=" flex w-full justify-end">
          <button
            type="submit"
            disabled={
              !appointmentType || Object.keys(selectedSlots).length === 0
            }
            onClick={handleBookAppointment}
            className={`${
              !appointmentType || Object.keys(selectedSlots).length === 0
                ? " cursor-not-allowed  bg-gray-700 opacity-50"
                : "bg-primary cursor-pointer"
            } w-fit text-center text-xs rounded-md px-6 py-2 text-white  `}
          >
            Proceed
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
