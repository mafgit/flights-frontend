"use client";

import { searchFlights } from "@/app/services/flights";
import Loading from "@/components/misc/Loading";
import SearchFilters from "@/components/flight-search/FlightSearchFilters";
import FlightSearchForm from "@/components/flight-search/FlightSearchForm";
import FlightSearchResult from "@/components/flight-search/FlightSearchResult";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISearchResult } from "@/types/ISearchResult";
import { ITripType } from "@/types/ITripType";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBan, FaPlaneDeparture } from "react-icons/fa6";
import { IDepartureTimes } from "@/types/IDepartureTimes";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";

const MAX_TOTAL_DURATION = 50;

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ISearchResult[][]>([]);
  const params = useSearchParams();
  const [segments, setSegments] = useState<ISearchFlight[]>([]);
  const router = useRouter();
  const [passengers, setPassengers] = useState<IPassengersSelectedOption>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [type, setType] = useState<IDropdownSelectedOption<ITripType>>({});

  const [departureTimes, setDepartureTimes] = useState<IDepartureTimes[]>([
    { min: 0, max: 24 },
  ]);
  const [totalDuration, setTotalDuration] = useState(MAX_TOTAL_DURATION);
  const [airlinesSelected, setAirlinesSelected] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);

    let flights = JSON.parse(params.get("segments") || "[]") as ISearchFlight[];
    // console.log("42", flights.length, type.value);

    let passengers2 = JSON.parse(
      params.get("passengers") || "{}"
    ) as IPassengersSelectedOption;

    const tripType = JSON.parse(
      params.get("type") || "{}"
    ) as IDropdownSelectedOption<ITripType>;

    if (flights.length === 0 || !tripType.value) {
      router.replace("/");
      setLoading(false);
      return;
    }

    const airlines = JSON.parse(params.get("airlines") || "[]") as number[];
    setAirlinesSelected(airlines);

    setType({ ...tripType });

    setPassengers(passengers2); // todo: passenger object and number validation

    let depTimes: IDepartureTimes[] = new Array(flights.length).fill({
      min: 0,
      max: 24,
    });

    if (tripType.value === "Return") {
      if (!flights[0].return_time) {
        // alert("No return time or flexibility days selected for round-trip");
        router.replace("/");
        setLoading(false);
        return;
      }

      flights = [
        {
          ...flights[0],
          // return_time: undefined,
        },
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

    //

    searchFlights(
      tripType.value,
      flights,
      passengers2,
      depTimes,
      airlines,
      totalDuration === MAX_TOTAL_DURATION ? undefined : totalDuration
    )
      .then((results) => {
        setResults(results ?? []);
      })
      .finally(() => setLoading(false));
  }, [params.toString()]);

  // useEffect(() => {

  // }, [departureTimes, totalDuration]);

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
          {type.value && segments && segments.length > 0 && (
            <FlightSearchForm
              typeFromParams={type}
              segmentsDataFromParams={segments}
              searchPage={true}
              airlinesFromSegments={airlinesSelected}
            />
          )}
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
          <div className="flex items-center justify-start gap-3 flex-col h-full self-start w-[60%]">
            {loading ? (
              <Loading />
            ) : (!results || results.length === 0) && !loading ? (
              <h3 className="text-center w-max flex items-center justify-center gap-2 flex-col">
                <FaBan className="text-3xl font-semibold " />
                <span className="text-2xl font-semibold ">No result found</span>
                <span>
                  Your passengers might be too many for available flights or for
                  the seat class you provided
                </span>
                <span>
                  Or flights may be unavailable within the flexibility period
                  you provided
                </span>
              </h3>
            ) : (
              results.map((r, i) => (
                <FlightSearchResult
                  result={r}
                  key={"result-" + i}
                  passengers={passengers}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// todo: currency
// todo: max total duration
// todo: fake seeder
