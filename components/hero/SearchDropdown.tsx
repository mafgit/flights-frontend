"use client";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import { Dispatch, useEffect, useRef, useState } from "react";
import { FaLocationArrow, FaXmark } from "react-icons/fa6";

const SearchDropdown = ({
  searchText,
  setSearchText,
  selectedOption,
  setSelectedOption,
  options,
  label,
  placeholder,
}: {
  label: string;
  options: ISearchDropdownOption[];
  selectedOption: Partial<ISearchDropdownOption>;
  searchText: string;
  placeholder: string;
  setSearchText: Dispatch<React.SetStateAction<string>>;
  setSelectedOption: Dispatch<
    React.SetStateAction<Partial<ISearchDropdownOption>>
  >;
}) => {
  const [opened, setOpened] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [shownOptions, setShownOptions] = useState<ISearchDropdownOption[]>([]);
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

  useEffect(() => {
    setShownOptions(options);
  }, [options]);

  useEffect(() => {
    const text = searchText.trim().toLowerCase();

    if (text) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        setShownOptions(
          options.filter((o) =>
            (o.city + " (" + o.code + "), " + o.country)
              .toLowerCase()
              .includes(text)
          )
        );
      }, 400);
    }
  }, [searchText]);

  return (
    <div
      className="bg-[#fffdf3] text-foreground-opposite rounded-md relative w-max "
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
          className="p-2 pt-[26px]"
          value={
            selectedOption.value
              ? selectedOption.city + " (" + selectedOption.code + ")"
              : searchText
          }
          onChange={(e) => {
            setSearchText(e.target.value);
            setSelectedOption({});
          }}
          onClick={() => {
            setOpened(!opened);
          }}
        />
        {opened && (
          <button
            className="absolute right-[6px]  top-[20px] font-extralight"
            onClick={() => {
              setSelectedOption({});
              setSearchText("");
              setOpened(false);
            }}
          >
            <FaXmark className="text-label" />
          </button>
        )}
      </div>
      <ul
        className={
          `z-[20] bg-[#fffdf3] overflow-y-auto max-h-[300px] absolute transition-all duration-100 ease-in w-max min-w-full rounded-md flex flex-col gap-1 top-[110%]  shadow-2xl shadow-black/50 ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        {shownOptions.map((option) => (
          <li
            key={String(option.value)}
            className="rounded-md bg-[#fffdf3] min-w-full flex items-center justify-start gap-3 px-2 py-1 cursor-pointer w-max h-full hover:brightness-90 transition-all duration-100 ease-in"
            onClick={() => {
              setSelectedOption(option);
              setOpened(false);
            }}
          >
            <FaLocationArrow className="text-primary" />{" "}
            <div className="flex flex-col">
              <span>{option.city + " (" + option.code + ")"}</span>
              <span className="text-sm">{option.country}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDropdown;
