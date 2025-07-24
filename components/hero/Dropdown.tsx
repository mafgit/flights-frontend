"use client";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import {
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Dropdown = <T,>({
  selectedOption,
  setSelectedOption,
  options,
  placeholder="Select an option",
}: {
  options: Required<IDropdownSelectedOption<T>>[];
  selectedOption: IDropdownSelectedOption<T>;
  setSelectedOption: Dispatch<React.SetStateAction<IDropdownSelectedOption<T>>>;
  placeholder?: string
}) => {
  const [opened, setOpened] = useState(false);
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
      className="bg-[#fffdf3] text-foreground-opposite rounded-md relative w-max"
      ref={ref}
    >
      <button
        className="flex items-center justify-between w-max px-2 py-1 gap-2"
        onClick={() => setOpened(!opened)}
      >
        {selectedOption.value !== undefined ? (
          <div className="flex items-center gap-2">
            {selectedOption.icon && <selectedOption.icon className="text-primary" />}
            <span>{selectedOption.label}</span>
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
      <ul
        className={
          `z-[20] bg-[#fffdf3] absolute transition-all duration-100 ease-in w-max min-w-full rounded-md flex flex-col gap-1 top-[110%] shadow-xl shadow-black/50 ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        {options.map((option) => (
          <li
            key={String(option.value)}
            className="rounded-md bg-[#fffdf3] flex items-center justify-start gap-2 px-2 py-1 cursor-pointer w-full h-full hover:brightness-90 transition-all duration-100 ease-in"
            onClick={() => {
              setSelectedOption(option);
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
