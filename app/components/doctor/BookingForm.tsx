import { useBooking } from "@/hooks/useBooking";
import { styles } from "@/styles/styles";
import { IDoctor } from "@/types/doctor.types";
import { getNextSevenDays } from "@/utils/helpers";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

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

type Props = {
  doctor: IDoctor;
};

const BookingForm = ({ doctor }: Props) => {
  const { bookingActions } = useBooking();

  const todayDate = new Date().getDate();
  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "short",
  });

  const today: number = new Date().getDay();
  const tomorrow = (today + 1) % 7;

  const [activeDay, setActiveDay] = useState<number>(0);
  const [notActiveDay, setNotActiveDay] = useState<boolean>(false);
  const [sortAvailableDays, setSortAvailableDays] = useState<string[]>([]);
  const [dates, setDates] = useState<any[]>([]);

  const [activeSlot, setActiveSlot] = useState();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const days = getNextSevenDays();
    setDates(days);
    const sortDays = doctor?.availableDays?.sort((a, b) => {
      const aIndex = daysOfWeek.indexOf(a);
      const bIndex = daysOfWeek.indexOf(b);

      const aDistance = (aIndex - today + 7) % 7;
      const bDistance = (bIndex - today + 7) % 7;

      return aDistance - bDistance;
    });

    setSortAvailableDays(sortDays);

    const checkToday = sortDays?.find(
      (day, i) => day.toLowerCase() === daysOfWeek[today].toLowerCase()
    );

    if (checkToday) {
      setActiveDay(0);
    } else {
      setActiveDay(-1);
      setNotActiveDay(true);
    }
  }, [doctor]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!containerRef.current) return;

    if (e.key === "ArrowLeft") {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setActiveDay((prev) =>
        activeDay === 0 ? sortAvailableDays?.length - 1 : prev - 1
      );
    } else if (e.key === "ArrowRight") {
      containerRef.current.scrollBy({
        left: activeDay === sortAvailableDays?.length - 1 ? 0 : 200,
        behavior: "smooth",
      });
      setActiveDay((prev) =>
        activeDay === sortAvailableDays?.length - 1 ? 0 : prev + 1
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

  return (
    <>
      <form className=" w-full flex flex-col space-y-8">
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
            <div className=" flex items-center min-w-max">
              {notActiveDay ? (
                <div className=" shrink-0 py-4 px-6 cursor-not-allowed opacity-30 ">
                  <p className=" text-sm font-medium">
                    <span>Today</span>
                    <span className=" block text-center  font-normal text-xs">
                      {`${currentMonth}, ${todayDate}`}
                    </span>
                  </p>
                </div>
              ) : null}

              {sortAvailableDays?.map((day, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (i === 0) {
                      resetScroll("left");
                    } else if (i === sortAvailableDays.length - 1) {
                      resetScroll("right");
                    }
                    setActiveDay(i);
                  }}
                  className={`shrink-0 py-4 px-6 cursor-pointer ${
                    activeDay === i
                      ? "border-b-4 border-primary text-primary rounded-lg bg-gray-200/80"
                      : ""
                  }`}
                >
                  <p className=" text-sm font-medium">
                    <span>
                      {day.toLowerCase() === daysOfWeek[today].toLowerCase()
                        ? "Today"
                        : day.toLowerCase() ===
                          daysOfWeek[tomorrow].toLowerCase()
                        ? "Tomorrow"
                        : day}
                    </span>

                    {dates?.map((date, index) => (
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
        </div>
      </form>
    </>
  );
};

export default BookingForm;
