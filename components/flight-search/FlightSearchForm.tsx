"use client";
import React, { useState } from "react";
import Dropdown from "../form/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import FlightSearchSegments from "./FlightSearchSegments";
import { ITripType, tripTypeOptions } from "@/types/ITripType";
import { ISearchFlight, searchSegmentsSchema } from "@/types/ISearchFlight";
import { useRouter } from "next/navigation";
import FlightSearchButton from "./FlightSearchButton";
import PassengerDropdown from "../form/PassengerDropdown";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import { validatePassengerCounts } from "@/utils/validatePassengerCounts";
import { flattenError, ZodError } from "zod";

const FlightSearchForm = ({
  typeFromParams = tripTypeOptions[0],
  segmentsDataFromParams = [{}],
  passengersFromParams = { adults: 1, children: 0, infants: 0 },
  searchPage = false,
  airlinesFromSegments = [],
}: {
  typeFromParams?: IDropdownSelectedOption<ITripType>;
  segmentsDataFromParams?: Partial<ISearchFlight>[];
  passengersFromParams?: IPassengersSelectedOption;
  searchPage?: boolean;
  airlinesFromSegments?: number[];
}) => {
  const [segmentsData, setSegmentsData] = useState<Partial<ISearchFlight>[]>(
    segmentsDataFromParams
  );

  // console.trace('typeFromParams', typeFromParams)

  const [selectedTypeOption, setSelectedTypeOption] =
    useState<IDropdownSelectedOption<ITripType>>(typeFromParams);

  const [passengersSelected, setPassengersSelected] =
    useState<IPassengersSelectedOption>(passengersFromParams);

  const router = useRouter();

  const onSearchClick = () => {
    // todo: validation
    try {
      if (!validatePassengerCounts(passengersSelected.adults, passengersSelected.children, passengersSelected.infants))
        throw new Error("Invalid number of passengers");

      searchSegmentsSchema.parse(segmentsData);

      router.push(
        "/search?type=" +
          encodeURIComponent(JSON.stringify(selectedTypeOption)) +
          "&passengers=" +
          encodeURI(JSON.stringify(passengersSelected)) +
          "&segments=" +
          encodeURIComponent(JSON.stringify(segmentsData)) +
          "&airlines=" +
          encodeURIComponent(JSON.stringify(airlinesFromSegments))
      );
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.issues);
        // alert((err as Error).message);
      }
    }
  };

  return (
    <div className={"w-full flex flex-col gap-4 "}>
      <div className="flex gap-2">
        <Dropdown<ITripType>
          options={tripTypeOptions}
          selectedOption={selectedTypeOption}
          setSelectedOption={setSelectedTypeOption}
        />

        <PassengerDropdown
          passengersSelected={passengersSelected}
          setPassengersSelected={setPassengersSelected}
        />
      </div>

      <FlightSearchSegments
        typeFromParams={selectedTypeOption}
        segmentsData={segmentsData}
        setSegmentsData={setSegmentsData}
      />

      <FlightSearchButton
        onSearchClick={onSearchClick}
        searchPage={searchPage}
      />
    </div>
  );
};

export default FlightSearchForm;
