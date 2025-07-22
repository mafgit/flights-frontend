"use client";
import { Dispatch, useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa6";

export interface DropdownSelectedOption<T> {
  value: T | undefined;
  label: string | undefined;
}

const Dropdown = <T,>({
  selectedOption,
  setSelectedOption,
  options,
}: {
  options: { label: string; value: T }[];
  selectedOption: DropdownSelectedOption<T>;
  setSelectedOption: Dispatch<React.SetStateAction<DropdownSelectedOption<T>>>;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="bg-foreground text-background rounded-md relative w-max">
      <button
        className="flex items-center justify-between w-max px-2 py-1 gap-2"
        onClick={() => setOpened(!opened)}
      >
        <span>
          {selectedOption.value !== undefined
            ? selectedOption.label
            : "Select Option"}
        </span>{" "}
        {!opened ? (
          <FaChevronDown className="text-sm text-secondary" />
        ) : (
          <FaChevronUp className="text-sm text-secondary" />
        )}
      </button>
      <ul
        className={
          `z-[20] bg-foreground absolute transition-all duration-100 ease-in w-max rounded-md flex flex-col gap-1 top-[110%] p-[2px] ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        {options.map((option) => (
          <li
            key={String(option.value)}
            className="rounded-md bg-foreground flex items-center justify-start gap-[5px] px-2 py-1 cursor-pointer w-full h-full hover:brightness-90 transition-all duration-100 ease-in"
            onClick={() => {
              setSelectedOption(option);
              setOpened(false);
            }}
          >
            <FaArrowRight className="text-secondary" />{" "}
            <span>{String(option.label)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
