"use client";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import { Dispatch, useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import Separator from "../misc/Separator";

const PassengerDropdown = ({
  passengersSelected,
  setPassengersSelected,
}: {
  passengersSelected: IPassengersSelectedOption;
  setPassengersSelected: Dispatch<
    React.SetStateAction<IPassengersSelectedOption>
  >;
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
      className="bg-dropdown/99 text-foreground-opposite rounded-md relative w-[170px] grow-0 shrink-[1] basis-[170px] max-h-[60px]"
      ref={ref}
    >
      <div className="relative h-[100px]">
        <label
          className="absolute top-[8px] left-[8px] text-sm text-primary-shade"
          htmlFor={"Passengers"}
        >
          {"Passengers"}
        </label>
        <input
          className="flex items-center justify-between px-2 py-1 gap-2 p-2 pt-[26px] w-full max-h-[100px]"
          placeholder="Choose passengers"
          onChange={() => {}}
          value={
            passengersSelected.adults +
              passengersSelected.children +
              passengersSelected.infants >
            0
              ? passengersSelected.adults +
                "a, " +
                passengersSelected.children +
                "c, " +
                passengersSelected.infants +
                "i"
              : ""
          }
          onClick={() => setOpened(!opened)}
        />
        {opened && (
          <button
            className="absolute right-[6px]  top-[20px] font-extralight"
            onClick={() => {
              setPassengersSelected({ adults: 0, children: 0, infants: 0 });
              setOpened(false);
            }}
          >
            <FaXmark className="text-label" />
          </button>
        )}
      </div>

      <ul
        className={
          `z-[20] bg-dropdown/99 absolute transition-all duration-100 ease-in w-max min-w-full rounded-md flex flex-col gap-2 top-[110%] p-3 shadow-xl shadow-black/50 ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold">
            Adults{" "}
            <span className="text-gray-600 font-normal">(&ge;12 age)</span>
          </p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.adults}</p>
            <button
              className="bg-blue-600 text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (
                  passengersSelected.adults +
                    passengersSelected.children +
                    passengersSelected.infants >=
                  9
                )
                  return;

                setPassengersSelected((p) => ({
                  ...p,
                  adults: p.adults + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-danger text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (passengersSelected.adults === 0) return;
                setPassengersSelected((p) => ({
                  ...p,
                  adults: p.adults - 1,
                }));
              }}
            >
              <FaMinus />
            </button>
          </div>
        </div>

        {/*  */}

        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold">
            Children{" "}
            <span className="text-gray-600 font-normal">(2-11 age)</span>
          </p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.children}</p>
            <button
              className="bg-blue-600 text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (
                  passengersSelected.adults +
                    passengersSelected.children +
                    passengersSelected.infants >=
                  9
                )
                  return;

                setPassengersSelected((p) => ({
                  ...p,
                  children: p.children + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-danger text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (passengersSelected.children === 0) return;
                setPassengersSelected((p) => ({
                  ...p,
                  children: p.children - 1,
                }));
              }}
            >
              <FaMinus />
            </button>
          </div>
        </div>

        {/*  */}

        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold">
            Infants{" "}
            <span className="text-gray-600 font-normal">(&lt;2 age)</span>
          </p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.infants}</p>
            <button
              className="bg-blue-600 text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (
                  passengersSelected.adults +
                    passengersSelected.children +
                    passengersSelected.infants >=
                  9
                )
                  return;

                setPassengersSelected((p) => ({
                  ...p,
                  infants: p.infants + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-danger text-white rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                if (passengersSelected.infants === 0) return;
                setPassengersSelected((p) => ({
                  ...p,
                  infants: p.infants - 1,
                }));
              }}
            >
              <FaMinus />
            </button>
          </div>
        </div>

        <Separator horizontal dark />
        <ul className="max-w-[220px] flex flex-col list-disc pl-5">
          <li className="text-sm">You can choose at most 9 passengers.</li>
          <li className="text-sm">At least one adult is necessary.</li>
          <li className="text-sm">
            Each infant must have at least one separate adult.
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default PassengerDropdown;
