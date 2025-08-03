import React, { useEffect, useState } from "react";
import { FaRightLeft, FaTrash } from "react-icons/fa6";
import SearchDropdown from "../form/SearchDropdown";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import DatePicker from "../form/DatePicker";
import Dropdown from "../form/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { ISelectedDate } from "@/types/ISelectedDate";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISeatClass } from "@/types/ISeatClass";
import { ITripType } from "@/types/ITripType";
import useAuthStore from "@/utils/useAuthStore";

export type IFlexibilityDays = 0 | 3 | 7 | 30;

const FlightSearchSegment = ({
  type,
  airportOptions,
  classOptions,
  segmentIdx,
  segment,
  updateSegment,
  removeSegment,
  numSegments,
}: {
  type: ITripType;
  airportOptions: ISearchDropdownOption[];
  numSegments: number;
  classOptions: Required<IDropdownSelectedOption<ISeatClass>>[];
  segmentIdx: number;
  segment: Partial<ISearchFlight>;
  updateSegment: (segmentIdx: number, field: any, value: any) => void;
  removeSegment: (segmentIdx: number) => void;
}) => {
  const [fromText, setFromText] = useState("");

  const [toText, setToText] = useState("");

  const swapFromAndTo = useAuthStore((s) => s.swapFromAndTo);

  return (
    <div className="flex gap-6 gap-y-2 flex-wrap items-center justify-start">
      <div className="flex justify-between items-center grow-[1] shrink-[1]">
        <SearchDropdown
          options={airportOptions}
          searchText={fromText}
          setSearchText={setFromText}
          selectedOption={segment.departure_airport ?? {}}
          setSelectedOption={(value) =>
            updateSegment(segmentIdx, "departure_airport", value)
          }
          label={"From"}
          placeholder={"Airport, city or country"}
        />

        <button
          className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!segment.departure_airport && !segment.arrival_airport}
          onClick={() => swapFromAndTo(segmentIdx)}
        >
          <FaRightLeft />
        </button>

        <SearchDropdown
          options={airportOptions}
          searchText={toText}
          setSearchText={setToText}
          selectedOption={segment.arrival_airport ?? {}}
          setSelectedOption={(value) =>
            updateSegment(segmentIdx, "arrival_airport", value)
          }
          label={"To"}
          placeholder={"Airport, city or country"}
        />
      </div>

      {/*  */}

      <div className="flex justify-end items-center gap-6 grow-[1] shrink-[1]">
        <DatePicker
          label={"Departure"}
          placeholder={"Choose date"}
          setDateSelected={(value) =>
            updateSegment(segmentIdx, "departure_time", value)
          }
          dateSelected={segment.departure_time ?? { flexibility_days: 7 }}
        />
        {type === "Return" && (
          <DatePicker
            label={"Return"}
            placeholder={"Choose date"}
            setDateSelected={(value) => {
              if (
                type === "Return" &&
                value?.day !== undefined &&
                value?.day > 0 &&
                value?.month !== undefined &&
                value?.month >= 0 &&
                value?.year !== undefined &&
                value?.year >= 2025
              ) {
                updateSegment(segmentIdx, "return_time", value);
              }
            }}
            dateSelected={segment.return_time ?? { flexibility_days: 7 }}
          />
        )}

        <Dropdown<ISeatClass>
          selectedOption={segment.seat_class || "economy"}
          setSelectedOption={(value: ISeatClass) =>
            updateSegment(segmentIdx, "seat_class", value)
          }
          options={classOptions}
          placeholder="Select Class"
          heading={'Seat Class'}
          grow={1}
        />
      </div>

      {type === "Multi-city" && numSegments > 1 && (
        <button className="" onClick={() => removeSegment(segmentIdx)}>
          <FaTrash className="text-foreground text-xs" />
        </button>
      )}
    </div>
  );
};

export default FlightSearchSegment;
