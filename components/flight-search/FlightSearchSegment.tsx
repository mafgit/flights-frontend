import React, { useEffect, useState } from "react";
import { FaRightLeft, FaTrash } from "react-icons/fa6";
import SearchDropdown from "../form/SearchDropdown";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import DatePicker from "../form/DatePicker";
import PassengerDropdown from "../form/PassengerDropdown";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import Dropdown from "../form/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { ISelectedDate } from "@/types/ISelectedDate";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISeatClass } from "@/types/ISeatClass";
import { ITripType } from "@/types/ITripType";

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
  const [selectedFromOption, setSelectedFromOption] = useState<
    Partial<ISearchDropdownOption>
  >(segment.departure_airport ?? {});
  const [fromText, setFromText] = useState("");

  const [selectedToOption, setSelectedToOption] = useState<
    Partial<ISearchDropdownOption>
  >(segment.arrival_airport ?? {});
  const [toText, setToText] = useState("");

  const [passengersSelected, setPassengersSelected] =
    useState<IPassengersSelectedOption>(
      segment.passengers ?? {
        adults: 0,
        children: 0,
        infants: 0,
      }
    );

  const [selectedClass, setSelectedClass] = useState<
    Partial<IDropdownSelectedOption<ISeatClass>>
  >(segment.seat_class ?? classOptions[0]);

  const [departureDate, setDepartureDate] = useState<ISelectedDate>(
    segment.departure_time ?? {}
  );
  const [returnDate, setReturnDate] = useState<ISelectedDate>(
    segment.return_time ?? {}
  );

  const [departureFlexibilityDays, setDepartureFlexibilityDays] =
    useState<IFlexibilityDays>(7);
  const [returnFlexibilityDays, setReturnFlexibilityDays] =
    useState<IFlexibilityDays>(7);

  const swapFromAndTo = () => {
    const temp = selectedToOption;
    setSelectedToOption(selectedFromOption);
    setSelectedFromOption(temp);
  };

  useEffect(() => {
    updateSegment(segmentIdx, "seat_class", selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    updateSegment(segmentIdx, "departure_airport", selectedFromOption);
  }, [selectedFromOption]);

  useEffect(() => {
    updateSegment(segmentIdx, "arrival_airport", selectedToOption);
  }, [selectedToOption]);

  useEffect(() => {
    updateSegment(segmentIdx, "passengers", passengersSelected);
  }, [passengersSelected]);

  useEffect(() => {
    updateSegment(segmentIdx, "return_flexibility_days", returnFlexibilityDays);
  }, [returnFlexibilityDays]);

  useEffect(() => {
    setReturnFlexibilityDays(departureFlexibilityDays);
    updateSegment(segmentIdx, "departure_flexibility_days", departureFlexibilityDays);
  }, [departureFlexibilityDays]);

  // useEffect(() => {
  //   updateSegment(segmentIdx, "departure_time", departureDate);
  // }, [departureDate]);

  useEffect(() => {
    if (
      departureDate.day !== undefined &&
      departureDate.day > 0 &&
      departureDate.month !== undefined &&
      departureDate.month >= 0 &&
      departureDate.year !== undefined &&
      departureDate.year >= 2025
    ) {
      updateSegment(segmentIdx, "departure_time", departureDate);
    }
  }, [departureDate]);

  useEffect(() => {
    if (
      type === "Round-trip" &&
      returnDate.day !== undefined &&
      returnDate.day > 0 &&
      returnDate.month !== undefined &&
      returnDate.month >= 0 &&
      returnDate.year !== undefined &&
      returnDate.year >= 2025
    ) {
      updateSegment(segmentIdx, "return_time", returnDate);
    }
  }, [returnDate]);

  return (
    <div className="flex gap-6 flex-wrap items-center justify-start">
      <div className="flex justify-between items-center grow-[1] shrink-[1]">
        <SearchDropdown
          options={airportOptions}
          searchText={fromText}
          setSearchText={setFromText}
          selectedOption={selectedFromOption}
          setSelectedOption={setSelectedFromOption}
          label={"From"}
          placeholder={"Airport, city or country"}
        />

        <button
          className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedFromOption.value && !selectedToOption.value}
          onClick={swapFromAndTo}
        >
          <FaRightLeft />
        </button>

        <SearchDropdown
          options={airportOptions}
          searchText={toText}
          setSearchText={setToText}
          selectedOption={selectedToOption}
          setSelectedOption={setSelectedToOption}
          label={"To"}
          placeholder={"Airport, city or country"}
        />
      </div>

      {/*  */}

      <div className="flex justify-end items-center gap-6 grow-[1] shrink-[1]">
        <DatePicker
          label={"Departure"}
          placeholder={"Choose date"}
          setDateSelected={setDepartureDate}
          dateSelected={departureDate}
          flexibilityDays={departureFlexibilityDays}
          setFlexibilityDays={setDepartureFlexibilityDays}
        />
        {type === "Round-trip" && (
          <DatePicker
            label={"Return"}
            placeholder={"Choose date"}
            setDateSelected={setReturnDate}
            dateSelected={returnDate}
            flexibilityDays={returnFlexibilityDays}
            setFlexibilityDays={setReturnFlexibilityDays}
          />
        )}
        <PassengerDropdown
          passengersSelected={passengersSelected}
          setPassengersSelected={setPassengersSelected}
        />

        <Dropdown<ISeatClass>
          selectedOption={selectedClass}
          setSelectedOption={setSelectedClass}
          options={classOptions}
          placeholder="Select Class"
        />
      </div>

      {type === "Multi-city" && numSegments > 1 && (
        <button
          className="bg-danger p-[5px] rounded-md"
          onClick={() => removeSegment(segmentIdx)}
        >
          <FaTrash className="text-foreground text-xs" />
        </button>
      )}
    </div>
  );
};

export default FlightSearchSegment;
