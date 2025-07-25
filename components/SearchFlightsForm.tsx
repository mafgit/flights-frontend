"use client";
import React, { useState } from "react";
import Dropdown from "./hero/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import {
  FaMapLocationDot,
  FaRotate,
  FaSquareArrowUpRight,
} from "react-icons/fa6";
import HeroSearch from "./hero/HeroSearch";
import { ITripType } from "@/types/ITripType";
import { ISearchFlight } from "@/types/ISearchFlight";

const typeOptions: Required<IDropdownSelectedOption<ITripType>>[] = [
  { label: "One-way", value: "One-way", icon: FaSquareArrowUpRight },
  { label: "Round-trip", value: "Round-trip", icon: FaRotate },
  { label: "Multi-city", value: "Multi-city", icon: FaMapLocationDot },
];
const SearchFlightsForm = ({
  typeFromParams = typeOptions[0],
  segmentsDataFromParams = [{}],
}: {
  typeFromParams?: IDropdownSelectedOption<ITripType>;
  segmentsDataFromParams?: Partial<ISearchFlight>[];
}) => {
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<IDropdownSelectedOption<ITripType>>(typeFromParams);

  console.log("selectedtype", selectedTypeOption);

  return (
    <div className={"w-full "}>
      <Dropdown<ITripType>
        options={typeOptions}
        selectedOption={selectedTypeOption}
        setSelectedOption={setSelectedTypeOption}
      />

      <HeroSearch
        typeFromParams={selectedTypeOption}
        segmentsDataFromParams={segmentsDataFromParams}
      />
    </div>
  );
};

export default SearchFlightsForm;
