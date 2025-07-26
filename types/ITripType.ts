import {
  FaMapLocationDot,
  FaRotate,
  FaSquareArrowUpRight,
} from "react-icons/fa6";
import { IDropdownSelectedOption } from "./IDropdownSelectedOption";

export type ITripType = "One-way" | "Return" | "Multi-city";

export const tripTypeOptions: Required<IDropdownSelectedOption<ITripType>>[] = [
  { label: "One-way", value: "One-way", icon: FaSquareArrowUpRight },
  { label: "Return", value: "Return", icon: FaRotate },
  { label: "Multi-city", value: "Multi-city", icon: FaMapLocationDot },
];
