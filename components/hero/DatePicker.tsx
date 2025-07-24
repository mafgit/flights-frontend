"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { ISelectedDate } from "@/types/ISelectedDate";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = new Date();
const d = date.getDate();
const m = date.getMonth() + 1;
const y = date.getFullYear();

const isValidDate = (dateSelected: ISelectedDate): boolean => {
  return (
    dateSelected.day !== undefined &&
    dateSelected.day >= 1 &&
    dateSelected.day <= 31 &&
    dateSelected.month !== undefined &&
    dateSelected.month >= 1 &&
    dateSelected.month <= 12 &&
    dateSelected.year !== undefined &&
    dateSelected.year >= 2025
  );
};

const DatePicker = ({
  label,
  placeholder,
  dateSelected,
  setDateSelected,
}: {
  label: string;
  placeholder: string;
  dateSelected: ISelectedDate;
  setDateSelected: Dispatch<SetStateAction<ISelectedDate>>;
}) => {
  const [opened, setOpened] = useState(false);
  const [onMonth, setOnMonth] = useState(m);
  const [onYear, setOnYear] = useState(y);

  const ref = useRef<HTMLDivElement>(null);

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
      className="bg-[#fffdf3] text-foreground-opposite rounded-md relative w-[170px] "
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
              setDateSelected({});
              setOpened(false);
            }}
          >
            <FaXmark className="text-label" />
          </button>
        )}
      </div>
      <div
        className={
          `z-[20] bg-[#fffdf3] overflow-y-auto absolute transition-all duration-100 ease-in w-max min-w-full rounded-md top-[110%] p-4 shadow-2xl shadow-black/50 flex items-center justify-center gap-2 flex-col ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        <div className="flex items-center justify-between gap-2 w-[85%]">
          <button
            className="disabled:opacity-0"
            disabled={onMonth <= 1 && onYear <= y}
            onClick={() => {
              if (onMonth <= 1) {
                setOnMonth(12);
                setOnYear(onYear - 1);
              } else {
                setOnMonth(onMonth - 1);
              }
            }}
          >
            <FaChevronLeft className="text-sm text-gray-600" />
          </button>

          <p className="font-semibold text-lg">
            {months[onMonth - 1] + ", " + onYear}
          </p>

          <button
            className="disabled:opacity-0"
            disabled={onMonth >= 12 && onYear > y}
            onClick={() => {
              if (onMonth >= 12) {
                setOnMonth(1);
                setOnYear(onYear + 1);
              } else {
                setOnMonth(onMonth + 1);
              }
            }}
          >
            <FaChevronRight className="text-sm text-gray-600" />
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default DatePicker;

// todo: add date range disabled check
