"use client";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import {
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaMinus,
  FaPlus,
  FaXmark,
} from "react-icons/fa6";

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
      className="bg-dropdown text-foreground-opposite rounded-md relative w-[170px] grow-[1] shrink-[1] basis-[170px]"
      ref={ref}
    >
      <div className="relative">
        <label
          className="absolute top-[8px] left-[8px] text-sm text-primary-shade"
          htmlFor={"Passengers"}
        >
          {"Passengers"}
        </label>
        <input
          className="flex items-center justify-between px-2 py-1 gap-2 p-2 pt-[26px] w-full"
          placeholder="Choose passengers"
          onChange={() => {}}
          value={
            passengersSelected.adults +
              passengersSelected.children +
              passengersSelected.infants >
            0
              ? passengersSelected.adults +
                "A, " +
                passengersSelected.children +
                "C, " +
                passengersSelected.infants +
                "I"
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
          `z-[20] bg-dropdown absolute transition-all duration-100 ease-in w-max min-w-full rounded-md flex flex-col gap-2 top-[110%] p-2 shadow-xl shadow-black/50 ` +
          (opened
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none")
        }
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold">Adults</p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.adults}</p>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                setPassengersSelected((p) => ({
                  ...p,
                  adults: p.adults + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
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

        <div className="flex justify-between items-center">
          <p className="font-semibold">Children</p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.children}</p>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                setPassengersSelected((p) => ({
                  ...p,
                  children: p.children + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
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

        <div className="flex justify-between items-center">
          <p className="font-semibold">Infants</p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mr-2 font-semibold">{passengersSelected.infants}</p>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
                setPassengersSelected((p) => ({
                  ...p,
                  infants: p.infants + 1,
                }));
              }}
            >
              <FaPlus />
            </button>
            <button
              className="bg-gray-300 rounded-md w-[22px] h-[22px] flex items-center justify-center text-xs"
              onClick={() => {
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
      </ul>
    </div>
  );
};

export default PassengerDropdown;
