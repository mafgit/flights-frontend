import { ComponentType, SVGProps } from "react";


export interface IDropdownSelectedOption<T> {
  label?: string;
  value?: T;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}
