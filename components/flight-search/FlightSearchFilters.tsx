"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Separator from "../misc/Separator";
import { fetchSomeAirlines } from "@/app/services/airlines";
import { ISearchFlight } from "@/types/ISearchFlight";
import { IDepartureTimes } from "@/types/IDepartureTimes";
import { FaPlaneDeparture } from "react-icons/fa6";

const valToTime = (val: number) => {
  if (val === 24) return `23:59`;
  if (val - Math.floor(val) === 0.5) {
    return `${Math.floor(val)}:30`;
  } else {
    return `${val}:00`;
  }
};

const SearchFilters = ({
  segments,
  totalDuration,
  setTotalDuration,
  MAX_TOTAL_DURATION,
  departureTimes,
  setDepartureTimes,
  airlinesSelected,
  setAirlinesSelected,
}: {
  segments: ISearchFlight[];
  totalDuration: number;
  setTotalDuration: Dispatch<SetStateAction<number>>;
  MAX_TOTAL_DURATION: number | undefined;
  departureTimes: IDepartureTimes[];
  setDepartureTimes: Dispatch<SetStateAction<IDepartureTimes[]>>;
  airlinesSelected: number[];
  setAirlinesSelected: Dispatch<SetStateAction<number[]>>;
}) => {
  const [airlines, setAirlines] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    fetchSomeAirlines().then((airlines) => {
      setAirlines(airlines);
      setAirlinesSelected(airlines.map((a: { id: number }) => a.id));
    });
  }, []);

  // useEffect(() => {
  //   console.log("asd", departureTimes);
  // }, [departureTimes]);

  return (
    <div className="min-h-full bg-foreground-opposite min-w-[300px] w-[20%] rounded-lg px-5 py-6 flex flex-col gap-6 items-center justify-start  shadow-md shadow-gray-900/40">
      <h3 className="text-2xl font-bold">Filters</h3>

      <div className="flex flex-col items-center justify-center w-full px-1 gap-3">
        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Max Total Duration</h4>
          <p className="text-gray-300">
            {totalDuration === MAX_TOTAL_DURATION
              ? "No limit"
              : `${totalDuration} hours`}
          </p>
          <input
            type="range"
            className="w-full"
            value={totalDuration}
            min={0}
            max={MAX_TOTAL_DURATION}
            step={0.5}
            onChange={(e) => setTotalDuration(parseFloat(e.target.value))}
          />
        </div>

        <Separator horizontal={true} />

        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Departure Times</h4>
          <div className="flex flex-col gap-4">
            {segments.map((segment, s) => (
              <div
                key={"segment-departure-time-filter-" + s}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-between gap-2">
                  <h4 className="flex items-center justify-center gap-[5px]">
                    <FaPlaneDeparture className="text-sm" />
                    <span>
                      {segment.departure_airport.code} -{" "}
                      {segment.arrival_airport.code}:
                    </span>
                  </h4>
                  <p className="text-gray-300">
                    {valToTime(departureTimes[s].min)} -{" "}
                    {valToTime(departureTimes[s].max)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="" className="text-gray-300">
                    Min
                  </label>
                  <input
                    type="range"
                    className="w-full"
                    value={departureTimes[s].min}
                    min={0}
                    max={departureTimes[s].max}
                    step={0.5}
                    onChange={(e) =>
                      setDepartureTimes(
                        departureTimes.map((a, i) =>
                          i === s
                            ? { ...a, min: parseFloat(e.target.value) }
                            : a
                        )
                      )
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <label htmlFor="" className="text-gray-300">
                    Max
                  </label>
                  <input
                    type="range"
                    className="w-full"
                    value={departureTimes[s].max}
                    min={departureTimes[s].min}
                    max={24}
                    step={0.5}
                    onChange={(e) =>
                      setDepartureTimes(
                        departureTimes.map((a, i) =>
                          i === s
                            ? { ...a, max: parseFloat(e.target.value) }
                            : a
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator horizontal={true} />

        <div className="w-full flex flex-col gap-2">
          <h4 className="text-xl font-semibold">Airlines</h4>
          {airlines.map((airline, i) => (
            <div key={"airline-filter-" + airline.id} className="flex gap-2">
              <input
                type="checkbox"
                id={"check-" + airline.id}
                checked={airlinesSelected.includes(airline.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesSelected([...airlinesSelected, airline.id]);
                  } else {
                    setAirlinesSelected(
                      airlinesSelected.filter((a) => a !== airline.id)
                    );
                  }
                }}
              />
              <label htmlFor={"check-" + airline.id}>{airline.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// todo: fix dep times issues

export default SearchFilters;
