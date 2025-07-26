"use client";

import { searchFlights } from "@/app/services/flights";
import Loading from "@/components/misc/Loading";
import SearchFilters from "@/components/flight-search/FlightSearchFilters";
import FlightSearchForm from "@/components/flight-search/FlightSearchForm";
import SearchResult from "@/components/flight-search/FlightSearchResult";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISearchResult } from "@/types/ISearchResult";
import { ITripType } from "@/types/ITripType";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBan, FaPlaneDeparture } from "react-icons/fa6";

const MAX_TOTAL_DURATION = 50;

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ISearchResult[][]>([]);
  const params = useSearchParams();
  const [segments, setSegments] = useState<ISearchFlight[]>([]);
  const [type, setType] = useState<IDropdownSelectedOption<ITripType>>({});

  const [departureTimes, setDepartureTimes] = useState<
    { min: number; max: number }[]
  >([]);
  const [totalDuration, setTotalDuration] = useState(MAX_TOTAL_DURATION);
  const [airlinesSelected, setAirlinesSelected] = useState<number[]>([]);

  useEffect(() => {
    let flights = JSON.parse(params.get("segments") || "[]") as ISearchFlight[];

    const tripType = JSON.parse(
      params.get("type") || "{}"
    ) as IDropdownSelectedOption<ITripType>;

    setType(tripType);

    let depTimes = new Array(flights.length).fill({ min: 0, max: 24 });

    if (tripType.value === "Round-trip") {
      if (!flights[0].return_time)
        throw new Error("No return time selected for round-trip");

      flights = [
        { ...flights[0], return_time: undefined },
        {
          ...flights[0],
          arrival_airport: flights[0].departure_airport,
          departure_airport: flights[0].arrival_airport,
          departure_time: flights[0].return_time,
        },
      ];

      depTimes = [departureTimes[0], departureTimes[0]];
    }

    setDepartureTimes(depTimes);

    setSegments(flights);
    setDepartureTimes(depTimes);
  }, [params]);

  useEffect(() => {
    if (segments.length === 0 || !type.value || airlinesSelected.length === 0)
      return;
    setLoading(true);
    searchFlights(
      type.value,
      segments,
      departureTimes,
      airlinesSelected
      //  totalDuration === MAX_TOTAL_DURATION ? undefined : totalDuration
    )
      .then((results) => {
        console.log("results:", results);
        setResults(results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [airlinesSelected, departureTimes]);

  return (
    <div className="mx-auto flex flex-col items-center">
      {/* <div className="w-full h-[1px] rounded-full bg-foreground/20 mb-4 mt-6 bg-gradient-to-r from-foreground-opposite via-foreground/30 to-foreground-opposite"></div> */}
      <div
        id="hero"
        className="w-full py-12"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundPosition: "center 150%",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      >
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2  p-4">
          <FaPlaneDeparture className="mr-2" /> Search Results{" "}
          <span className="font-normal text-[16px] text-foreground/70">
            ({results.length})
          </span>
        </h1>
        <div className="w-full p-4 max-w-[1300px] mx-auto">
          {" "}
          <FlightSearchForm
            typeFromParams={type}
            segmentsDataFromParams={JSON.parse(params.get("segments") ?? "[]")}
          />
        </div>
      </div>
      {/* <div className="w-full h-[1px] rounded-full bg-foreground/20 mt-4 mb-0 bg-gradient-to-r from-foreground-opposite via-foreground/30 to-foreground-opposite"></div> */}

      <div className="w-full">
        <div className="flex gap-6 h-full items-center justify-start w-full min-h-[100px] mt-8 max-w-[1300px] mx-auto">
          {segments.length && departureTimes.length && (
            <SearchFilters
              segments={segments}
              setTotalDuration={setTotalDuration}
              totalDuration={totalDuration}
              MAX_TOTAL_DURATION={MAX_TOTAL_DURATION}
              departureTimes={departureTimes}
              setDepartureTimes={setDepartureTimes}
              airlinesSelected={airlinesSelected}
              setAirlinesSelected={setAirlinesSelected}
            />
          )}
          <div className="flex items-center justify-start gap-3 flex-col h-full  self-start">
            {loading ? (
              <Loading />
            ) : results !== undefined && results.length === 0 ? (
              <h3 className="text-2xl font-semibold text-center w-max flex items-center justify-center gap-2">
                <FaBan className="text-3xl" />
                <span>No result found</span>
              </h3>
            ) : (
              results.map((r, i) => (
                <SearchResult result={r} key={"result-" + i} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
