import {
  FaMapLocationDot,
  FaRotate,
  FaSquareArrowUpRight,
} from "react-icons/fa6";
import { IDropdownSelectedOption } from "./IDropdownSelectedOption";

export type ITripType = "One-way" | "Round-trip" | "Multi-city";

export const tripTypeOptions: Required<IDropdownSelectedOption<ITripType>>[] = [
  { label: "One-way", value: "One-way", icon: FaSquareArrowUpRight },
  { label: "Round-trip", value: "Round-trip", icon: FaRotate },
  { label: "Multi-city", value: "Multi-city", icon: FaMapLocationDot },
];
