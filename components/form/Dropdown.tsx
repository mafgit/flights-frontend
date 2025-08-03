"use client";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { Dispatch, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Dropdown = <T,>({
  selectedOption,
  setSelectedOption,
  options,
  placeholder = "Select an option",
  heading,
  grow = 0,
}: {
  options: Required<IDropdownSelectedOption<T>>[];
  selectedOption: T;
  setSelectedOption: (type: T) => void;
  placeholder?: string;
  heading: string;
  grow?: number;
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOptionState, setSelectedOptionState] = useState<
    Required<IDropdownSelectedOption<T>>
  >(options[1]);

  useEffect(() => {
    setSelectedOptionState(options.find((o) => o.value === selectedOption)!);
  }, [selectedOption]);

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
      className={`bg-dropdown/99 text-foreground-opposite rounded-md relative w-max basis-[180px] shrink-0 grow-[${grow}]`}
      ref={ref}
    >
      <div className="relative">
        <label
          className="absolute top-[8px] left-[8px] text-sm text-primary-shade"
          htmlFor={""}
        >
          {heading}
        </label>

        <button
          className="flex items-center justify-between px-2 py-1 gap-2 p-2 pt-[28px] w-full max-h-[100px]"
          onClick={() => setOpened(!opened)}
        >
          {selectedOptionState?.value !== undefined ? (
            <div className="flex items-center gap-2">
              {selectedOptionState?.icon && (
                <selectedOptionState.icon className="text-primary text-sm" />
              )}
              <span>{selectedOptionState.label}</span>
            </div>
          ) : (
            <span className="text-label">{placeholder}</span>
          )}
          {!opened ? (
            <FaChevronDown className="text-sm text-primary pointer-events-none" />
          ) : (
            <FaChevronUp className="text-sm text-primary pointer-events-none" />
          )}
        </button>
      </div>
      <ul
        className={
          `z-[20] bg-dropdown/99 absolute transition-all duration-100 ease-in w-max min-w-full rounded-md flex flex-col gap-1 top-[110%] shadow-xl shadow-black/50 ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        {options.map((option) => (
          <li
            key={String(option.value)}
            className="rounded-md bg-dropdown/99 flex items-center justify-start gap-2 px-2 py-1 cursor-pointer w-full h-full hover:brightness-90 transition-all duration-100 ease-in"
            onClick={() => {
              console.log(option.value);

              setSelectedOption(
                options.find((o) => o.value === option.value)!.value
              );
              setOpened(false);
            }}
          >
            <option.icon className="text-primary" />{" "}
            <span>{String(option.label)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
