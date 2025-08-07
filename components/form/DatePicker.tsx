"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { ISelectedDate } from "@/types/ISelectedDate";
import Separator from "../misc/Separator";
import { IFlexibilityDays } from "../flight-search/FlightSearchSegment";
import { days, isValidDate, months, d, m, y } from "@/utils/datePicker";

const DatePicker = ({
  label,
  placeholder,
  dateSelected,
  setDateSelected,
}: {
  label: string;
  placeholder: string;
  dateSelected: ISelectedDate;
  setDateSelected: (value: ISelectedDate) => void;
}) => {
  const [opened, setOpened] = useState(false);
  const [onMonth, setOnMonth] = useState(m);
  const [onYear, setOnYear] = useState(y);

  const ref = useRef<HTMLDivElement>(null);

  const decrementMonth = () => {
    if (onMonth <= 1) {
      setOnMonth(12);
      setOnYear(onYear - 1);
    } else {
      setOnMonth(onMonth - 1);
    }
  };

  const incrementMonth = () => {
    if (onMonth >= 12) {
      setOnMonth(1);
      setOnYear(onYear + 1);
    } else {
      setOnMonth(onMonth + 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="bg-dropdown/99 text-foreground-opposite rounded-md relative w-[170px] grow-[1] shrink-[1] basis-[170px]"
      ref={ref}
    >
      <div className="relative">
        <label
          className="absolute top-[8px] left-[8px] text-sm text-primary-shade"
          htmlFor={label}
        >
          {label}
        </label>
        <input
          autoComplete="off"
          type="text"
          id={label}
          placeholder={placeholder}
          className="p-2 pt-[26px] w-full"
          onChange={() => {}}
          value={
            isValidDate(dateSelected)
              ? dateSelected.day +
                " " +
                months[dateSelected.month! - 1] +
                ", " +
                dateSelected.year
              : ""
          }
          onClick={() => {
            setOpened(!opened);
          }}
        />
        {opened && (
          <button
            className="absolute right-[6px]  top-[20px] font-extralight"
            onClick={() => {
              setDateSelected({ flexibility_days: 30 });
              setOpened(false);
            }}
          >
            <FaXmark className="text-label" />
          </button>
        )}
      </div>

      <div
        className={
          `z-[20] bg-dropdown/99 overflow-y-auto absolute transition-all duration-100 ease-in w-max rounded-md top-[110%] py-4 px-4 shadow-2xl shadow-black/50 flex items-center justify-center gap-2 flex-col ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        <div className="flex items-center justify-between gap-2 w-[85%]">
          <button
            className="disabled:opacity-0"
            disabled={onMonth <= 1 && onYear <= y}
            onClick={decrementMonth}
          >
            <FaChevronLeft className="text-sm text-gray-600" />
          </button>

          <p className="font-semibold text-lg">
            {months[onMonth - 1] + ", " + onYear}
          </p>

          <button
            className="disabled:opacity-0"
            disabled={onMonth >= 12 && onYear > y}
            onClick={incrementMonth}
          >
            <FaChevronRight className="text-sm text-gray-600" />
          </button>
        </div>

        {/* <Separator horizontal dark /> */}

        <ul className="grid grid-cols-7 items-center justify-center place-items-center gap-1">
          {new Array(onMonth === 2 && onYear % 4 === 0 ? 29 : days[onMonth - 1])
            .fill(0)
            .map((_, i) => (
              <button
                key={"date-" + i}
                disabled={(() => {
                  return (
                    onYear < y ||
                    (i + 1 < d && onMonth <= m && onYear <= y) ||
                    (onMonth < m && onYear === y)
                  );
                })()}
                onClick={() => {
                  setDateSelected({
                    ...dateSelected,
                    day: i + 1,
                    month: onMonth,
                    year: onYear,
                  });
                }}
                className={
                  "border-gray-300/50 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed border-1 w-[35px] h-[35px] rounded-md flex items-center justify-center not-disabled:cursor-pointer not-disabled:hover:border-primary/80 transition-all duration-100 " +
                  (onYear === dateSelected.year &&
                  onMonth === dateSelected.month &&
                  dateSelected.day === i + 1
                    ? "bg-primary text-light"
                    : "")
                }
              >
                {i + 1}
              </button>
            ))}
        </ul>

        <div className="w-[90%] mx-auto">
          <Separator horizontal={true} dark={true} />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 w-[85%] mx-auto">
          <h3 className="text-lg font-semibold">Flexibility Days</h3>
          <div className="text-sm flex flex-wrap justify-center items-center gap-2">
            {([0, 3, 7, 30] as IFlexibilityDays[]).map((option, i) => (
              <button
                onClick={() =>
                  setDateSelected({ ...dateSelected, flexibility_days: option })
                }
                key={"flexibility-option-" + i}
                className={`${
                  dateSelected.flexibility_days === option
                    ? "bg-primary-shade text-light"
                    : "bg-transparent text-primary-shade transition-all duration-150 hover:bg-primary-shade/20"
                } border-1 border-primary-shade rounded-md p-1`}
              >
                {option === 0 ? "Today" : "+ " + option + "d"}
              </button>
            ))}
          </div>
          {/* <div className="flex gap-1">
            <button className="bg-primary text-light rounded-l-md p-[2px]">
              <FaMinus />
            </button>
            <button className="bg-primary text-light rounded-r-md p-[2px]">
              <FaPlus />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

// todo: add date range disabled check
