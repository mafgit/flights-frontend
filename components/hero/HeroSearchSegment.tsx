import React, { useEffect, useState } from "react";
import { FaRightLeft, FaTrash } from "react-icons/fa6";
import SearchDropdown from "./SearchDropdown";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import DatePicker from "./DatePicker";
import PassengerDropdown from "./PassengerDropdown";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import Dropdown from "./Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { ISelectedDate } from "@/types/ISelectedDate";
import { ITripType } from "./Hero";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISeatClass } from "@/types/ISeatClass";

const HeroSearchSegment = ({
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
  >({});
  const [fromText, setFromText] = useState("");

  const [selectedToOption, setSelectedToOption] = useState<
    Partial<ISearchDropdownOption>
  >({});
  const [toText, setToText] = useState("");

  const [passengersSelected, setPassengersSelected] =
    useState<IPassengersSelectedOption>({
      adults: 0,
      children: 0,
      infants: 0,
    });

  const [selectedClass, setSelectedClass] = useState<
    Partial<IDropdownSelectedOption<ISeatClass>>
  >(classOptions[0]);

  const [departureDate, setDepartureDate] = useState<ISelectedDate>({});
  const [returnDate, setReturnDate] = useState<ISelectedDate>({});

  const swapFromAndTo = () => {
    const temp = selectedToOption;
    setSelectedToOption(selectedFromOption);
    setSelectedFromOption(temp);
  };

  useEffect(() => {
    updateSegment(segmentIdx, "seat_class", selectedClass.value);
  }, [selectedClass]);

  useEffect(() => {
    updateSegment(segmentIdx, "departure_airport_id", selectedFromOption.value);
  }, [selectedFromOption]);

  useEffect(() => {
    updateSegment(segmentIdx, "arrival_airport_id", selectedToOption.value);
  }, [selectedToOption]);

  useEffect(() => {
    updateSegment(segmentIdx, "passengers", passengersSelected);
  }, [passengersSelected]);

  // useEffect(() => {
  //   updateSegment(segmentIdx, "departure_time", departureDate);
  // }, [departureDate]);

  useEffect(() => {
    console.log(departureDate);

    if (
      departureDate.day !== undefined &&
      departureDate.day > 0 &&
      departureDate.month !== undefined &&
      departureDate.month >= 0 &&
      departureDate.year !== undefined &&
      departureDate.year >= 2024
    ) {
      updateSegment(segmentIdx, "departure_time", departureDate);
    } else {
      console.log("not valid dep date", departureDate);
    }
  }, [departureDate]);

  return (
    <div className="flex gap-6 flex-wrap items-center justify-start">
      <div className="flex justify-between items-center">
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

      <div className="flex justify-between items-center gap-6">
        <DatePicker
          label={"Departure"}
          placeholder={"Choose date"}
          setDateSelected={setDepartureDate}
          dateSelected={departureDate}
        />
        {type === "Round-trip" && (
          <DatePicker
            label={"Return"}
            placeholder={"Choose date"}
            setDateSelected={setReturnDate}
            dateSelected={returnDate}
          />
        )}
        <PassengerDropdown
          passengersSelected={passengersSelected}
          setPassengersSelected={setPassengersSelected}
        />
      </div>

      <Dropdown<ISeatClass>
        selectedOption={selectedClass}
        setSelectedOption={setSelectedClass}
        options={classOptions}
        placeholder="Select Class"
      />

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

export default HeroSearchSegment;
