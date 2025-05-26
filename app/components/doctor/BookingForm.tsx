import { useBooking } from "@/hooks/useBooking";
import { useFetchAvailableDaySlots } from "@/hooks/useFetchAvailableSlots";
import {
  EventBusyIcon,
  GrainIcon,
  WbSunnyIcon,
  WbTwilightIcon,
} from "@/icons/icons";
import { styles } from "@/styles/styles";
import { IDoctor } from "@/types/doctor.types";
import { getNextSevenDays } from "@/utils/helpers";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import ButtonLoader from "../global/loaders/ButtonLoader";

const appointmentTypes = ["Hospital Visitation", "Online Consultation"];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dailySessions = [
  { label: "Morning", icon: <GrainIcon color="inherit" fontSize="inherit" /> },
  {
    label: "Afternoon",
    icon: <WbSunnyIcon color="inherit" fontSize="inherit" />,
  },
  {
    label: "Evening",
    icon: <WbTwilightIcon color="inherit" fontSize="inherit" />,
  },
];

type Props = {
  doctor: IDoctor;
};

const BookingForm = ({ doctor }: Props) => {
  const { bookingActions } = useBooking();
  const [activeDateSlot, setActiveDateSlot] = useState<string>("");

  const { data, loading } = useFetchAvailableDaySlots(
    doctor.id,
    activeDateSlot
  );
  const todayDate = new Date().getDate();
  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "short",
  });

  const todayIndex: number = new Date().getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;
  const todayName = daysOfWeek[todayIndex];
  const tomorrowName = daysOfWeek[tomorrowIndex];

  const [activeDay, setActiveDay] = useState<number>(0);
  const [todayNotAvailable, setTodayNotAvailable] = useState<boolean>(false);
  const [sortedAvailableDays, setSortedAvailableDays] = useState<string[]>([]);
  const [weeklyDates, setWeeklyDates] = useState<any[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!doctor) return;

    const oneWeekFromToday = getNextSevenDays();
    setWeeklyDates(oneWeekFromToday);

    const sortedDays = [...(doctor?.availableDays || [])].sort((a, b) => {
      const aIndex = daysOfWeek.indexOf(a);
      const bIndex = daysOfWeek.indexOf(b);

      const aDistance = (aIndex - todayIndex + 7) % 7;
      const bDistance = (bIndex - todayIndex + 7) % 7;

      return aDistance - bDistance;
    });

    setSortedAvailableDays(sortedDays);

    // check if the today is part of the doctor days
    const isTodayAvailable = sortedDays?.some(
      (day) => day.toLowerCase() === daysOfWeek[todayIndex].toLowerCase()
    );

    setTodayNotAvailable(!isTodayAvailable);

    const findSlotDate = (dayName: string) => {
      const dayData = oneWeekFromToday.find((d) => d.name === dayName);
      if (!dayData) return;
      return `${dayData?.year}-${String(dayData?.monthInteger + 1).padStart(
        2,
        "0"
      )}-${dayData?.date}`;
    };

    // order is important
    const activeDate =
      findSlotDate(todayName) || findSlotDate(tomorrowName) || sortedDays[0]
        ? findSlotDate(sortedDays[0])
        : null;

    if (activeDate) {
      setActiveDateSlot(activeDate);
    }
  }, [doctor]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!containerRef.current) return;

    if (e.key === "ArrowLeft") {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setActiveDay((prev) => (activeDay === 0 ? 0 : prev - 1));
    } else if (e.key === "ArrowRight") {
      containerRef.current.scrollBy({
        left: activeDay === sortedAvailableDays?.length - 1 ? 0 : 200,
        behavior: "smooth",
      });
      setActiveDay((prev) =>
        activeDay === sortedAvailableDays?.length - 1
          ? sortedAvailableDays?.length - 1
          : prev + 1
      );
    }
  };

  const resetScroll = (dir: "left" | "right") => {
    if (containerRef.current) {
      if (dir === "left") {
        containerRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        containerRef.current.scrollTo({
          left: containerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const handleClickSlot = async (day: string, index: number) => {
    setActiveDay(index);

    const halfLength = Math.floor(sortedAvailableDays.length / 2);
    if (index < halfLength) {
      resetScroll("left");
    } else {
      resetScroll("right");
    }

    const oneWeekFromToday = getNextSevenDays();
    const dayData = oneWeekFromToday.find((d) => d.name === day);
    if (!dayData) return;
    const selectedDate = `${dayData?.year}-${String(
      dayData?.monthInteger + 1
    ).padStart(2, "0")}-${dayData?.date}`;

    setActiveDateSlot(selectedDate);
  };

  console.log("AVAILABLE SLOTS", data);

  return (
    <>
      <form className=" flex-1  flex flex-col space-y-8">
        {/* appointment type */}
        <div>
          <label htmlFor="appointmentType" className={styles.bookingLabel}>
            Choose Appointment Type<span className=" text-red-500 ml-3">*</span>
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
                  checked={i === 1}
                  onChange={() => bookingActions.setAppointmentType(ap)}
                />
                <span className=" text-xs text-grayey">{ap}</span>
              </fieldset>
            ))}
          </div>
        </div>

        {/* appointment reason */}
        <div>
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
        </div>

        {/* appointment time */}

        <div className=" w-full min-w-0">
          <label htmlFor="reason" className={styles.bookingLabel}>
            Choose Appointment Time Slot{" "}
            <span className=" text-red-500 ml-3">*</span>
          </label>

          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className=" w-full overflow-y-hidden slot-scrollbar mt-4 focus:outline-0"
          >
            {/* doctor available days */}
            <div className=" flex items-center min-w-max">
              {todayNotAvailable ? (
                <div className=" shrink-0 py-4 px-6 cursor-not-allowed opacity-30 ">
                  <p className=" text-sm font-medium">
                    <span>Today</span>
                    <span className=" block text-center  font-normal text-xs">
                      {`${currentMonth}, ${todayDate}`}
                    </span>
                  </p>
                </div>
              ) : null}

              {sortedAvailableDays?.map((day, i) => (
                <div
                  key={i}
                  onClick={() => handleClickSlot(day, i)}
                  className={`shrink-0 p-4  cursor-pointer ${
                    activeDay === i
                      ? "border-b-4 border-primary text-primary rounded-lg bg-gray-200/80"
                      : ""
                  }`}
                >
                  <p className=" text-sm font-medium">
                    <span>
                      {day.toLowerCase() ===
                      daysOfWeek[todayIndex].toLowerCase()
                        ? "Today"
                        : day.toLowerCase() ===
                          daysOfWeek[tomorrowIndex].toLowerCase()
                        ? "Tomorrow"
                        : day}
                    </span>

                    {weeklyDates?.map((date, index) => (
                      <span
                        className=" block text-center text-primary font-normal text-xs"
                        key={index}
                      >
                        {date.name === day ? `${date.month}, ${date.date}` : ""}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* selected day time slot */}
          <div className=" w-full bg-gray-100 min-h-fit mt-6">
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                {dailySessions.map((session, i) => {
                  const doctorSession = data?.availableSlots?.slots.find(
                    (s: any) => s.label === session.label
                  );

                  return (
                    <div
                      key={i}
                      className=" w-full rounded-lg p-4 border-b-4 border-white"
                    >
                      <div
                        className={`${
                          !doctorSession?.label
                            ? "opacity-50 text-gray-500 line-through cursor-not-allowed"
                            : "text-primary"
                        } flex items-center gap-1  text-xs font-medium`}
                      >
                        <span>{session.icon}</span>
                        <span>{session.label}</span>
                      </div>

                      <div className=" mt-4 w-full flex flex-wrap  gap-4">
                        {doctorSession?.availableSlots?.length ? (
                          doctorSession?.availableSlots?.map(
                            (slot: string, i: number) => (
                              <div
                                key={i}
                                className="border border-gray-500 text-black rounded-md text-[11px] py-2 text-center w-[110px] cursor-pointer transition-all duration-500 hover:bg-primary hover:text-white hover:border-none"
                              >
                                {slot}
                              </div>
                            )
                          )
                        ) : (
                          <p className=" text-xs text-red-500">
                            <span>
                              <EventBusyIcon fontSize="inherit" />
                            </span>
                            <span> Doctor not available</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
