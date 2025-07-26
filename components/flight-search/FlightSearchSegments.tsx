"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import FlightSearchSegment from "./FlightSearchSegment";
import { fetchAirportOptions } from "@/app/services/airports";
import { ISearchFlight } from "@/types/ISearchFlight";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import { ITripType } from "@/types/ITripType";
import { seatClassOptions } from "@/types/ISeatClass";

const FlightSearchSegments = ({
  typeFromParams,
  segmentsData,
  setSegmentsData,
}: {
  typeFromParams: IDropdownSelectedOption<ITripType>;
  segmentsData: Partial<ISearchFlight>[];
  setSegmentsData: Dispatch<SetStateAction<Partial<ISearchFlight>[]>>;
}) => {
  const [airportOptions, setAirportOptions] = useState<ISearchDropdownOption[]>(
    []
  );

  const updateSegment = (segmentIdx: number, field: any, value: any) => {
    setSegmentsData((prev) => {
      return prev.map((segment, i) => {
        if (i === segmentIdx) {
          return {
            ...segment,
            [field]: value,
          };
        } else {
          return segment;
        }
      });
    });
  };

  const removeSegment = (segmentIdx: number) => {
    setSegmentsData((prev) => {
      return prev.filter((_, i) => i !== segmentIdx);
    });
  };

  useEffect(() => {
    fetchAirportOptions().then((airports) => {
      setAirportOptions(
        airports.map(
          (a: { code: string; city: string; country: string; id: number }) => ({
            ...a,
            value: a.id,
          })
        )
      );
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-2 justify-between">
      <div className="flex flex-col gap-2">
        {segmentsData
          .slice(0, typeFromParams.value === "Multi-city" ? undefined : 1)
          .map((segment, idx) => (
            <FlightSearchSegment
              key={idx}
              type={typeFromParams.value!}
              airportOptions={airportOptions}
              classOptions={seatClassOptions}
              segmentIdx={idx}
              segment={segment}
              updateSegment={updateSegment}
              numSegments={segmentsData.length}
              removeSegment={removeSegment}
            />
          ))}
      </div>
      {typeFromParams.value === "Multi-city" && (
        <button
          className="flex gap-2 items-center justify-center p-2 rounded-md"
          onClick={() => {
            setSegmentsData((prev) => [...prev, {}]);
          }}
        >
          <FaPlus />
          <span>Add Segment</span>
        </button>
      )}
    </div>
  );
};

export default FlightSearchSegments;
