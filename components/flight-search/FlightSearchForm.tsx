"use client";
import React, { useEffect, useState } from "react";
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
import { ZodError } from "zod";
import useAuthStore from "@/utils/useAuthStore";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import { fetchAirportOptions } from "@/app/services/airports";

const FlightSearchForm = ({
  typeFromParams = tripTypeOptions[0],
  segmentsDataFromParams = undefined,
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
  console.log(segmentsDataFromParams);

  const [segmentsData, setSegmentsData] = useState<Partial<ISearchFlight>[]>([
    {},
  ]);

  const [selectedTypeOption, setSelectedTypeOption] =
    useState<IDropdownSelectedOption<ITripType>>(typeFromParams);

  const [passengersSelected, setPassengersSelected] =
    useState<IPassengersSelectedOption>(passengersFromParams);

  const [airportOptions, setAirportOptions] = useState<ISearchDropdownOption[]>(
    []
  );

  const router = useRouter();
  const city = useAuthStore((state) => state.city);

  useEffect(() => {
    fetchAirportOptions().then((airports) => {
      const valueToSet = airports.map((a) => ({
        value: a.id,
        code: a.code,
        city: a.city,
        country: a.country,
      }));

      setAirportOptions(valueToSet);

      if (segmentsDataFromParams === undefined) {
        console.log("setting 1");
        const date = new Date();

        setSegmentsData([
          {
            departure_airport: valueToSet.find((a) => a.city === city),
            departure_time: {
              day: date.getDate(),
              month: date.getMonth() + 1,
              year: date.getFullYear(),
              flexibility_days: 7,
            },
          },
        ]);
      }
    });
  }, []);

  const onSearchClick = () => {
    // todo: validation
    try {
      if (
        !validatePassengerCounts(
          passengersSelected.adults,
          passengersSelected.children,
          passengersSelected.infants
        )
      )
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

      {airportOptions.length > 0 &&
      segmentsData.length > 0 &&
      segmentsData[0].departure_airport ? (
        <>
          <FlightSearchSegments
            typeFromParams={selectedTypeOption}
            segmentsData={segmentsData}
            setSegmentsData={setSegmentsData}
            airportOptions={airportOptions}
          />
          <FlightSearchButton
            onSearchClick={onSearchClick}
            searchPage={searchPage}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FlightSearchForm;
