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
import { FaBan, FaLocationDot, FaPlaneDeparture } from "react-icons/fa6";
import { IDepartureTimes } from "@/types/IDepartureTimes";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import Image from "next/image";
import { findByCity } from "@/utils/cityImages";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import useAuthStore from "@/utils/useAuthStore";

const MAX_TOTAL_DURATION = 50;

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ISearchResult[][]>([]);
  const params = useSearchParams();
  const [segments, setSegments] = useState<ISearchFlight[]>([]);
  const router = useRouter();

  const [departureTimes, setDepartureTimes] = useState<IDepartureTimes[]>([
    { min: 0, max: 24 },
  ]);
  const [totalDuration, setTotalDuration] = useState(MAX_TOTAL_DURATION);
  const [airlinesSelected, setAirlinesSelected] = useState<number[]>([]);
  const [bg, setBg] = useState("/hero.jpg");
  const formatCurrency = useCurrencyFormatter();

  const setType = useAuthStore((s) => s.setType);
  const type = useAuthStore((s) => s.type);

  const passengers = useAuthStore((s) => s.passengers);
  const setPassengers = useAuthStore((s) => s.setPassengers);

  useEffect(() => {
    setLoading(true);

    let flights = JSON.parse(params.get("segments") || "[]") as ISearchFlight[];
    // console.log("42", flights.length, type.value);

    let passengers2 = JSON.parse(
      params.get("passengers") || "{}"
    ) as IPassengersSelectedOption;

    const tripType = (params.get("type") as ITripType) || "One-way";

    if (flights.length === 0 || !tripType) {
      router.replace("/");
      setLoading(false);
      return;
    }

    const airlines = JSON.parse(params.get("airlines") || "[]") as number[];
    setAirlinesSelected(airlines);

    setType(tripType);

    setPassengers(passengers2); // todo: passenger object and number validation

    let depTimes: IDepartureTimes[] = new Array(flights.length).fill({
      min: 0,
      max: 24,
    });

    if (tripType === "Return") {
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

    let i = Math.floor(Math.random() * flights.length);
    if (flights[i].departure_airport.city) {
      const imgs = findByCity(
        flights[i].departure_airport.city,
        flights[i].departure_airport.country
      );

      if (imgs.length > 0) setBg(imgs[0].image_url);
    }

    setDepartureTimes(depTimes);
    setSegments(flights);

    //

    searchFlights(
      tripType,
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
          backgroundImage: `url(${bg})`,
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
          {type && segments && segments.length > 0 && (
            <FlightSearchForm
              searchPage={true}
              airlinesFromSegments={airlinesSelected}
            />
          )}
        </div>
      </div>
      {/* <div className="w-full h-[1px] rounded-full bg-foreground/20 mt-4 mb-0 bg-gradient-to-r from-foreground-opposite via-foreground/30 to-foreground-opposite"></div> */}

      <div className="w-full">
        <div className="flex gap-6 h-full items-center justify-between w-full min-h-[100px] mt-8 max-w-[1300px] mx-auto">
          {segments.length && departureTimes.length ? (
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
          ) : null}

          <div className="flex items-center justify-start gap-3 flex-col h-full self-start w-[50%]">
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

          <div className="flex flex-col gap-4 items-center justify-start h-full self-start">
            {segments.length &&
              segments.map((s) => {
                if (!s.departure_airport.city) return null;

                const images = findByCity(
                  s.departure_airport.city,
                  s.departure_airport.country
                );

                if (images.length === 0) return null;

                const { image_url, city, country, id, label } = images[0];

                return (
                  <div
                    className="rounded-lg relative z-[5] w-full h-[150px] shadow-xl shadow-background/80 "
                    key={`image-${id}-${city}`}
                  >
                    <Image
                      src={image_url}
                      height={1000}
                      width={1000}
                      alt={label}
                      className="w-full h-full z-[5] object-cover rounded-lg "
                    />

                    <div className="opacity-100 duration-200 bg-gradient-to-b from-black/30 via-black/30 via-65%% to-black/60 z-[7] rounded-lg absolute top-0 left-0 w-full h-full"></div>

                    <div className="bg-black/0 w-full h-[40px] absolute bottom-0 rounded-b-lg left-0 z-[10] flex flex-col gap-0 justify-center items-start">
                      <div className="w-full z-[10] flex flex-col gap-1 justify-center items-center">
                        <h3 className="flex gap-2 items-center justify-center z-[10]">
                          <span>
                            <FaLocationDot className="text-primary" />
                          </span>
                          <span className="tracking-widest uppercase">
                            {city}
                          </span>
                          <span className="text-light/90 tracking-widest uppercase text-sm">
                            {country}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
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
