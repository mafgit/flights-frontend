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
          // options={airportOptions.filter(
          //   (a) => a.value !== segment.arrival_airport?.value
          // )}
          segmentIdx={segmentIdx}
          options={airportOptions}
          searchText={fromText}
          setSearchText={setFromText}
          otherOption={segment.arrival_airport}
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
          segmentIdx={segmentIdx}
          options={
            // segment.departure_airport && segment.departure_airport.value
            //   ? airportOptions.filter(
            //       (a) => a.value !== segment.departure_airport.value
            //     )
            //   : airportOptions
            airportOptions
          }
          otherOption={segment.departure_airport}
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
          segmentIdx={segmentIdx}
          setDateSelected={(value) => {
            // if (segment.departure_time?.day !== undefined && segment.departure_time.month > 0 && segment.departure_time.year !== undefined)
            // if (new Date(segment.departure_time.year, segment.departure_time.month, segment.departure_time.day))
            updateSegment(segmentIdx, "departure_time", value);
            // updateSegment(segmentIdx, "return_time", value);
          }}
          dateSelected={segment.departure_time ?? { flexibility_days: 30 }}
        />
        {type === "Return" && (
          <DatePicker
            label={"Return"}
            placeholder={"Choose date"}
            segmentIdx={segmentIdx}
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
            dateSelected={segment.return_time ?? { flexibility_days: 30 }}
          />
        )}

        <Dropdown<ISeatClass>
          selectedOption={segment.seat_class || "any"}
          setSelectedOption={(value: ISeatClass) =>
            updateSegment(segmentIdx, "seat_class", value)
          }
          options={classOptions}
          placeholder="Select Class"
          heading={"Seat Class"}
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
