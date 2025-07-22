"use client";
import { useState } from "react";
import SearchDropdown, { SearchDropdownOption } from "./SearchDropdown";
import { FaRightLeft } from "react-icons/fa6";

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

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-2">
        <div className="flex">
          <SearchDropdown
            options={airportOptions}
            searchText={fromText}
            setSearchText={setFromText}
            selectedOption={selectedFromOption}
            setSelectedOption={setSelectedFromOption}
            label={"From"}
            placeholder={"Airport, city or country"}
          />

          <button className="p-2 rounded-full" onClick={() => {}}>
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
          label={"To"}
          placeholder={"Airport, city or country"}
        />

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
    </div>
  );
};

export default HeroSearch;
