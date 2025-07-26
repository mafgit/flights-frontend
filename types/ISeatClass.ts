import { FaB, FaE, FaF, FaP } from "react-icons/fa6";
import { IDropdownSelectedOption } from "./IDropdownSelectedOption";

export type ISeatClass = "economy" | "business" | "first" | "premium";

export const seatClassOptions: Required<
  IDropdownSelectedOption<ISeatClass>
>[] = [
  {
    icon: FaE,
    label: "Economy",
    value: "economy",
  },
  {
    icon: FaB,
    label: "Business",
    value: "business",
  },
  {
    icon: FaF,
    label: "First Class",
    value: "first",
  },
  {
    icon: FaP,
    label: "Premium",
    value: "premium",
  },
];