import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formattedDate, getDaysInAMonth, getFullDate } from "@/utils/helpers";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EventBusyIcon,
  GrainIcon,
  WbSunnyIcon,
  WbTwilightIcon,
} from "@/icons/icons";
import { useDoctorsStore } from "@/store/useDoctorsStore";
import { useFetchAvailableDaySlots } from "@/hooks/useFetchAvailableSlots";
import ButtonLoader from "../global/loaders/ButtonLoader";
import { SeletectedSlotsType } from "@/types/booking.types";

const monthsIndex: { [key: string]: number } = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};
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
  selectedSlots: SeletectedSlotsType;
  setSelectedSlots: (value: any) => void;
};

const SchedulePicker = ({ selectedSlots, setSelectedSlots }: Props) => {
  const doctor = useDoctorsStore((state) => state.doctor);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayFullDate = getFullDate(today);
  const tomorrowFullDate = getFullDate(tomorrow);

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [monthlyAvailableDays, setMonthlyAvailableDays] = useState<
    { date: number; dayName: string; fullDate: string; isAvailable: boolean }[]
  >([]);
  const { data: availableSlotsData, loading } = useFetchAvailableDaySlots(
    doctor.id,
    selectedDate || "none"
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    if (!doctor) return;

    //   check if selected month is current month
    const isCurrentMonth =
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear();

    const dates = getDaysInAMonth(
      selectedYear,
      selectedMonth,
      isCurrentMonth,
      doctor.availableDays
    );

    // check for availablity
    const checkAvailablity = (date: Date) => {
      const dayName = date.toLocaleString("en-US", { weekday: "long" });
      const isAvailable = doctor?.availableDays?.includes(dayName);
      const fullDate = getFullDate(date);

      return { fullDate, isAvailable };
    };

    const { fullDate: todayFullDate, isAvailable: isTodayAvailable } =
      checkAvailablity(today);
    const { fullDate: tomorrowFullDate, isAvailable: isTomorrowAvailable } =
      checkAvailablity(tomorrow);

    let nextAvailableDate: string | null = null;

    if (!isTodayAvailable && !isTomorrowAvailable) {
      for (let i = 2; i < 31; i++) {
        const future = new Date();
        future.setDate(today.getDate() + i);
        const { fullDate, isAvailable } = checkAvailablity(future);
        if (isAvailable) {
          nextAvailableDate = fullDate;
          break;
        }
      }
    }

    const activeDate = isTodayAvailable
      ? todayFullDate
      : isTomorrowAvailable
      ? tomorrowFullDate
      : nextAvailableDate;

    setSelectedDate(activeDate);

    setMonthlyAvailableDays(dates);
  }, [doctor, selectedMonth]);

  const navigation = (direction: "left" | "right") => {
    const container = containerRef.current;

    if (!container) return;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 10)
        : container.scrollLeft + (container.offsetWidth + 10);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  //   get present month + 2 more months
  const monthOptions = [0, 1, 2].map((offset) => {
    const newDate = new Date(today.getFullYear(), today.getMonth() + offset);
    return {
      label: `${newDate.toLocaleString("default", {
        month: "long",
      })} ${newDate.getFullYear()}`,
      value: `${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${newDate.getFullYear()}`,
    };
  });

  const scrollToItem = (index: number) => {
    const el = itemRefs.current[index];
    if (el && containerRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!monthlyAvailableDays?.length) return;

    let newIndex = selectedIndex;

    if (e.key === "ArrowRight") {
      newIndex = Math.min(selectedIndex + 1, monthlyAvailableDays.length - 1);
    } else if (e.key === "ArrowLeft") {
      newIndex = Math.max(selectedIndex - 1, 0);
    }

    const day = monthlyAvailableDays[newIndex];
    if (day?.isAvailable) {
      setSelectedIndex(newIndex);
      setSelectedDate(day.fullDate);
      scrollToItem(newIndex);
    }
  };

  const handleClickDateSlot = (date: string, index: number) => {
    setSelectedDate(date);
    setSelectedIndex(index);
    scrollToItem(index);

    if ((index + 1) % 3 === 0) {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: 100,
          behavior: "smooth",
        });
      }
    }
  };

  const handleSelectSlot = (
    slot: string,
    session: string,
    date: string | null,
    doctorId: string
  ) => {
    setSelectedSlots((prev: any) => {
      if (!date) return;
      // select the doctor slot
      const doctorSlot = prev?.[date]?.[doctorId];

      // user clicks same slot
      if (doctorSlot && doctorSlot.slot === slot) {
        const updateDay = { ...prev[date] };
        delete updateDay[doctorId]; // removes the slot and session for that day, becomes {}

        const updated = {
          ...prev,
          [date]: updateDay,
        };

        if (Object.keys(updateDay).length === 0) {
          delete updated[date];
        }

        return { ...updated };
      }

      // final data for a fresh click
      return {
        ...prev, // other dates
        [date]: {
          ...(prev?.[date] || {}), // spread incase there are other doctors booked on same date
          [doctorId]: { session, slot },
        },
      };
    });
  };

  const doctorSlotHasBennSelected = Object.values(selectedSlots).some(
    (doctorSlots) => !!doctorSlots[doctor.id]
  );

  const isDoctorSelectedForDate = (date: string, doctorId: string) => {
    return !!selectedSlots[date]?.[doctorId];
  };

  const dateString = Object.keys(selectedSlots)?.[0];
  const appointmentDate = formattedDate(dateString);
  const appointmentSession = selectedSlots?.[dateString]?.[doctor.id]?.session;
  const appointmentSlot = selectedSlots?.[dateString]?.[doctor.id]?.slot;

  const slotTimeHasPassed = (slot: string): boolean => {
    const isToday = selectedDate === todayFullDate;
    if (!isToday) return false;

    // parse slot start time
    const slotStart = slot.split("-")[0].trim();

    const [time, meridian] = slotStart.split(/(AM|PM)/i);
    const [hourStr, minuteStr] = time.split(":");
    let hr = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || "0", 10);

    if (meridian.toUpperCase() === "PM" && hr !== 12) hr += 12;
    if (meridian.toUpperCase() === "AM" && hr === 12) hr = 0;

    const now = new Date();
    const slotDate = new Date();
    slotDate.setHours(hr, minute, 0, 0);

    const isPast = isToday && slotDate.getTime() < now.getTime();

    return isPast;
  };

  return (
    <>
      <div className=" w-full mt-3">
        {/* select month schedule */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="xl:text-sm text-xs text-primary font-semibold">
            Select Schedule
          </h2>

          <Select
            disabled={!selectedDate}
            onValueChange={(value: string) => {
              const [month, year] = value.split(" ");
              setSelectedMonth(monthsIndex[month]);
              setSelectedYear(+year);
            }}
          >
            <SelectTrigger className="border border-gray-200 bg-primary text-white rounded  w-fit  xl:text-xs text-[10px]">
              <SelectValue placeholder={monthOptions[0].label} />
            </SelectTrigger>
            <SelectContent className=" bg-gray-100 border-none">
              {monthOptions.map((opt, i) => (
                <SelectItem key={i} value={opt.label}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className=" relative ">
          {/* slide left */}

          {/* LEFT SCROLL: FOR EXTRA LARGE SCREENS */}
          {monthlyAvailableDays?.length >= 5 && (
            <button
              type="button"
              onClick={() => navigation("left")}
              className={`
            hidden xl:flex  justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -left-4 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          )}

          {/* LEFT SCROLL: FOR  LARGE SCREENS */}
          {monthlyAvailableDays?.length >= 3 && (
            <button
              type="button"
              onClick={() => navigation("left")}
              className={`
            xl:hidden hidden lg:flex  justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -left-4 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          )}

          {/* LEFT SCROLL: FOR  TABLET SCREENS */}
          {monthlyAvailableDays?.length >= 7 && (
            <button
              type="button"
              onClick={() => navigation("left")}
              className={`
            xl:hidden lg:hidden hidden md:flex justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -left-2 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          )}

          {/* LEFT SCROLL: FOR  PHONE SCREENS */}
          {monthlyAvailableDays?.length >= 3 && (
            <button
              type="button"
              onClick={() => navigation("left")}
              className={`
            xl:hidden lg:hidden md:hidden flex justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute left-3 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          )}

          {/* slide right */}
          {/* RIGHT SCROLL: FOR EXTRA LARGE SCREENS */}
          {monthlyAvailableDays?.length >= 5 && (
            <button
              type="button"
              onClick={() => navigation("right")}
              className={`
            hidden xl:flex  justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -right-4 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          )}

          {/* RIGHT SCROLL: FOR  LARGE SCREENS */}
          {monthlyAvailableDays?.length >= 3 && (
            <button
              type="button"
              onClick={() => navigation("right")}
              className={`
            xl:hidden hidden lg:flex  justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -right-4 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          )}

          {/* RIGHT SCROLL: FOR  TABLET SCREENS */}
          {monthlyAvailableDays?.length >= 7 && (
            <button
              type="button"
              onClick={() => navigation("left")}
              className={`
            xl:hidden lg:hidden hidden md:flex justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute -right-2 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          )}

          {/* RIGHT SCROLL: FOR  PHONE SCREENS */}
          {monthlyAvailableDays?.length >= 3 && (
            <button
              type="button"
              onClick={() => navigation("right")}
              className={`
            xl:hidden lg:hidden md:hidden flex justify-center items-center
           cursor-pointer bg-blue-200 z-10 absolute right-3 top-2  w-8 h-8   rounded-full text-primary`}
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          )}

          {/* scroll container */}
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="  mx-auto w-[70%] md:w-[90%] overflow-y-hidden slot-scrollbar mt-4 focus:outline-0"
          >
            <div className=" gap-1 flex justify-center items-center min-w-max">
              {monthlyAvailableDays?.map((day, i) => {
                const isActiveDate =
                  selectedDate && selectedDate === day.fullDate;
                const hasDoctorBeenSelectedForDate = isDoctorSelectedForDate(
                  day.fullDate,
                  doctor.id
                );

                return (
                  <button
                    ref={(el: any) => (itemRefs.current[i] = el)}
                    type="button"
                    key={i}
                    disabled={!day.isAvailable || !selectedDate}
                    onClick={() => handleClickDateSlot(day.fullDate, i)}
                    className={`shrink-0 p-3 focus:outline-none   ${
                      isActiveDate && day.isAvailable
                        ? "border-b-4 border-primary text-primary rounded-lg bg-gray-200/80  cursor-pointer"
                        : hasDoctorBeenSelectedForDate
                        ? "border-b-4 border-text-red-500 text-red-500 rounded-lg bg-gray-200/80  cursor-pointer"
                        : day.isAvailable
                        ? "cursor-pointer transition-all duration-500 hover:bg-gray-200/80 rounded-lg "
                        : "opacity-50 cursor-not-allowed line-through"
                    } `}
                  >
                    <p className=" text-xs font-medium">
                      <span>
                        {day.fullDate === todayFullDate
                          ? "Today"
                          : day.fullDate === tomorrowFullDate
                          ? "Tomorrow"
                          : `${day.dayName}, ${String(day.date).padStart(
                              2,
                              "0"
                            )}`}
                      </span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* selected day time slot */}
          {selectedDate ? (
            <div className=" w-full bg-blue-100/50 min-h-fit mt-6">
              {loading ? (
                <div className=" w-full py-20">
                  <ButtonLoader />
                </div>
              ) : (
                <>
                  {/* daily 3 sessions */}
                  {dailySessions?.map((session, i) => {
                    // find the doctor session per label (object) {label: morning, availableSlots: [9AM-9.30AM, 9.30AM-10AM.....]}
                    const doctorSession =
                      availableSlotsData?.availableSlots?.slots.find(
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
                              (slot: string, i: number) => {
                                const isSelected =
                                  selectedDate &&
                                  selectedSlots?.[selectedDate]?.[doctor.id]
                                    ?.slot === slot;

                                // check if the slot is selected and if a slot has been selected
                                const isDisabled =
                                  (!isSelected && doctorSlotHasBennSelected) ||
                                  slotTimeHasPassed(slot);

                                return (
                                  <div
                                    key={i}
                                    onClick={() => {
                                      if (isDisabled) return;
                                      handleSelectSlot(
                                        slot,
                                        doctorSession.label,
                                        selectedDate,
                                        doctor.id
                                      );
                                    }}
                                    className={`border border-gray-500 text-black rounded-md text-[11px] py-2 text-center w-[110px]  transition-all duration-500   ${
                                      isSelected
                                        ? "bg-primary text-white cursor-pointer"
                                        : ""
                                    } ${
                                      isDisabled
                                        ? " cursor-not-allowed opacity-30"
                                        : "hover:bg-primary hover:text-white hover:border-none cursor-pointer"
                                    }`}
                                  >
                                    {slot}
                                  </div>
                                );
                              }
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
          ) : (
            <div className=" w-full bg-blue-100/50  mt-6 p-6">
              <p className=" text-xs text-red-500">
                Sorry, <b>{doctor?.name}</b> is currently not available at the
                moment
              </p>
            </div>
          )}

          {/* show brief summary */}
          {!loading && Object.keys(selectedSlots).length >= 1 && (
            <div className=" mt-2 flex flex-col space-y-2">
              <p className=" text-xs">
                Appointment Date:{" "}
                <span className=" text-primary font-medium">
                  {appointmentDate.dayOfWeek}, {appointmentDate.month}{" "}
                  {appointmentDate.day}, {appointmentDate.year}.
                </span>{" "}
              </p>
              <p className=" text-xs">
                Appointment Session:{" "}
                <span className=" text-primary font-medium">
                  {appointmentSession}.
                </span>
              </p>
              <p className=" text-xs">
                Appointment Time:{" "}
                <span className=" text-primary font-medium">
                  {appointmentSlot}.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulePicker;
