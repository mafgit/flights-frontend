"use client";
import React, { useState } from "react";
import Dropdown from "../form/Dropdown";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import FlightSearchSegments from "./FlightSearchSegments";
import { ITripType, tripTypeOptions } from "@/types/ITripType";
import { ISearchFlight } from "@/types/ISearchFlight";
import { useRouter } from "next/navigation";
import FlightSearchButton from "./FlightSearchButton";

const FlightSearchForm = ({
  typeFromParams = tripTypeOptions[0],
  segmentsDataFromParams = [{}],
}: {
  typeFromParams?: IDropdownSelectedOption<ITripType>;
  segmentsDataFromParams?: Partial<ISearchFlight>[];
}) => {
  const [segmentsData, setSegmentsData] = useState<Partial<ISearchFlight>[]>(
    segmentsDataFromParams
  );

  const [selectedTypeOption, setSelectedTypeOption] =
    useState<IDropdownSelectedOption<ITripType>>(typeFromParams);

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
          segment.passengers === undefined ||
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
          typeFromParams.value === "Round-trip" &&
          segment.return_time === undefined
        ) {
          return false;
        }

        return true;
      })
    ) {
      return alert("Fill all the fields"); // todo: toasts
    }

    router.push(
      "/search?type=" +
        encodeURIComponent(JSON.stringify(typeFromParams)) +
        "&segments=" +
        encodeURIComponent(JSON.stringify(segmentsData))
    );
  };

  return (
    <div className={"w-full "}>
      <Dropdown<ITripType>
        options={tripTypeOptions}
        selectedOption={selectedTypeOption}
        setSelectedOption={setSelectedTypeOption}
      />

      <FlightSearchSegments
        typeFromParams={selectedTypeOption}
        segmentsData={segmentsData}
        setSegmentsData={setSegmentsData}
      />

      <FlightSearchButton onSearchClick={onSearchClick}/>
    </div>
  );
};

export default FlightSearchForm;
