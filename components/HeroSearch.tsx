"use client";
import { useState } from "react";
import SearchDropdown, { SearchDropdownOption } from "./SearchDropdown";
import { FaMagnifyingGlass, FaRightLeft } from "react-icons/fa6";

const airportOptions = [
  {
    city: "Karachi",
    country: "Pakistan",
    code: "KAR",
    value: 1,
  },
  {
    city: "Islamabad",
    country: "Pakistan",
    code: "ISL",
    value: 2,
  },
  {
    city: "Rawalpindi",
    country: "Pakistan",
    code: "RW",
    value: 3,
  },
  {
    city: "Sialkot",
    country: "Pakistan",
    code: "SI",
    value: 4,
  },
  { city: "London", country: "England", code: "LN", value: 5 },
  {
    city: "Melbourne",
    country: "Australia",
    code: "ML",
    value: 6,
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    code: "DH",
    value: 7,
  },
  {
    city: "Washington D.C.",
    country: "United States of America",
    code: "WA",
    value: 8,
  },
];

const HeroSearch = () => {
  const [selectedFromOption, setSelectedFromOption] = useState<
    Partial<SearchDropdownOption>
  >({});
  const [fromText, setFromText] = useState("");

  const [selectedToOption, setSelectedToOption] = useState<
    Partial<SearchDropdownOption>
  >({});
  const [toText, setToText] = useState("");

  const swapFromAndTo = () => {
    const temp = selectedToOption;
    setSelectedToOption(selectedFromOption);
    setSelectedFromOption(temp);
  };

  return (
    <div className="flex flex-col gap-2 mt-2 justify-between">
      <div className="flex gap-2 flex-wrap items-center justify-between">
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

        <SearchDropdown
          options={airportOptions}
          searchText={toText}
          setSearchText={setToText}
          selectedOption={selectedToOption}
          setSelectedOption={setSelectedToOption}
          label={"Departure"}
          placeholder={"Choose date"}
        />

        <SearchDropdown
          options={airportOptions}
          searchText={toText}
          setSearchText={setToText}
          selectedOption={selectedToOption}
          setSelectedOption={setSelectedToOption}
          label={"Return"}
          placeholder={"Choose date"}
        />

        <SearchDropdown
          options={airportOptions}
          searchText={toText}
          setSearchText={setToText}
          selectedOption={selectedToOption}
          setSelectedOption={setSelectedToOption}
          label={"Passengers"}
          placeholder={"Select passengers"}
        />
      </div>

      <button className="search-btn relative mt-4 w-full bg-background rounded-md flex items-center justify-center gap-2 text-lg p-2 ">
        <div
          className={
            "z-[5] bg-white h-full w-0 absolute top-0 left-0 transition-all duration-200 rounded-md "
          }
        ></div>
        <FaMagnifyingGlass className="z-[10] transition-all duration-200" />
        <span className="z-[10]  transition-all duration-200">
          Search Flights
        </span>
      </button>
    </div>
  );
};

export default HeroSearch;
