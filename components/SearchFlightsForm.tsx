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

const typeOptions: Required<IDropdownSelectedOption<ITripType>>[] = [
  { label: "One-way", value: "One-way", icon: FaSquareArrowUpRight },
  { label: "Round-trip", value: "Round-trip", icon: FaRotate },
  { label: "Multi-city", value: "Multi-city", icon: FaMapLocationDot },
];
const SearchFlightsForm = ({ showBtn = true }: { showBtn?: boolean }) => {
  const [selectedTypeOption, setSelectedTypeOption] = useState<
    IDropdownSelectedOption<ITripType>
  >(typeOptions[0]);

  return (
    <div className={"w-full "}>
      <Dropdown<ITripType>
        options={typeOptions}
        selectedOption={selectedTypeOption}
        setSelectedOption={setSelectedTypeOption}
      />

      <HeroSearch
        type={selectedTypeOption.value ?? "One-way"}
        showBtn={showBtn}
      />
    </div>
  );
};

export default SearchFlightsForm;
