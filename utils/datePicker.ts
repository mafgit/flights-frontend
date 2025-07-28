import { ISelectedDate } from "@/types/ISelectedDate";

export const months = [
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
export const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = new Date();
export const d = date.getDate();
export const m = date.getMonth() + 1;
export const y = date.getFullYear();

export const isValidDate = (dateSelected: ISelectedDate): boolean => {
  return (
    dateSelected.day !== undefined &&
    dateSelected.day >= 1 &&
    dateSelected.day <= 31 &&
    dateSelected.month !== undefined &&
    dateSelected.month >= 1 &&
    dateSelected.month <= 12 &&
    dateSelected.year !== undefined &&
    dateSelected.year >= 2025 &&
    dateSelected.flexibility_days > 0 &&
    dateSelected.flexibility_days <= 31
  );
};
