"use client";
import React, { useState } from "react";
import Dropdown from "../form/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import FlightSearchSegments from "./FlightSearchSegments";
import { ITripType, tripTypeOptions } from "@/types/ITripType";
import { ISearchFlight } from "@/types/ISearchFlight";
import { useRouter } from "next/navigation";
import FlightSearchButton from "./FlightSearchButton";
import PassengerDropdown from "../form/PassengerDropdown";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";

const FlightSearchForm = ({
  typeFromParams = tripTypeOptions[0],
  segmentsDataFromParams = [{}],
  passengersFromParams = { adults: 1, children: 0, infants: 0 },
  searchPage = false,
  airlinesFromSegments=[],
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
    if (
      !segmentsData.some((segment) => {
        if (
          segment.arrival_airport === undefined ||
          segment.departure_airport === undefined
        ) {
          return false;
        }

        if (
          segment.departure_time === undefined ||
          segment.seat_class === undefined
        ) {
          return false;
        }

        if (
          segment.departure_time.day === undefined ||
          segment.departure_time.month === undefined ||
          segment.departure_time.year === undefined
        ) {
          return false;
        }

        if (
          selectedTypeOption.value === "Return" &&
          segment.return_time === undefined
        ) {
          return false;
        }

        return true;
      })
    ) {
      return alert("Fill all the fields"); // todo: toasts, passenger check, etc
    }

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
