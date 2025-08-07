"use client";
import React, { useEffect } from "react";
import Dropdown from "../form/Dropdown";
import FlightSearchSegments from "./FlightSearchSegments";
import { ITripType, tripTypeOptions } from "@/types/ITripType";
import { searchSegmentsSchema } from "@/types/ISearchFlight";
import { useRouter } from "next/navigation";
import FlightSearchButton from "./FlightSearchButton";
import PassengerDropdown from "../form/PassengerDropdown";
import { validatePassengerCounts } from "@/utils/validatePassengerCounts";
import { ZodError } from "zod";
import useAuthStore from "@/utils/useAuthStore";
import { goToSearchPage } from "@/app/services/flights";

const FlightSearchForm = ({
  searchPage = false,
  airlinesFromSegments = [],
}: {
  searchPage?: boolean;
  airlinesFromSegments?: number[];
}) => {
  const segmentsData = useAuthStore((s) => s.segments);
  const airportOptions = useAuthStore((s) => s.airportOptions);
  const setType = useAuthStore((s) => s.setType);
  const passengersSelected = useAuthStore((s) => s.passengers);
  const tripType = useAuthStore((s) => s.type);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(segmentsData);
  // }, [segmentsData]);

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

      console.log(segmentsData);

      searchSegmentsSchema.parse(segmentsData);

      goToSearchPage(
        router,
        tripType,
        passengersSelected,
        segmentsData,
        airlinesFromSegments
      );
      // router.push(
      //   "/search?type=" +
      //     tripType +
      //     "&passengers=" +
      //     encodeURI(JSON.stringify(passengersSelected)) +
      //     "&segments=" +
      //     encodeURIComponent(JSON.stringify(segmentsData)) +
      //     "&airlines=" +
      //     encodeURIComponent(JSON.stringify(airlinesFromSegments))
      // );
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
          selectedOption={tripType}
          setSelectedOption={setType}
          heading="Trip Type"
        />

        <PassengerDropdown />
      </div>

      {airportOptions.length > 0 &&
      segmentsData.length > 0 &&
      segmentsData[0].departure_airport ? (
        <>
          <FlightSearchSegments />
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
