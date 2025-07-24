"use client";
import { useEffect, useState } from "react";
import { FaB, FaE, FaF, FaMagnifyingGlass, FaP, FaPlus } from "react-icons/fa6";
import { IDropdownSelectedOption } from "@/types/IDropdownSelectedOption";
import HeroSearchSegment from "./HeroSearchSegment";
import { fetchAirportOptions } from "@/app/services/search";
import { ISearchFlight } from "@/types/ISearchFlight";
import useMyStore from "@/utils/useMyStore";
import { useRouter } from "next/navigation";
import { ISearchDropdownOption } from "@/types/ISearchDropdownOption";
import { ITripType } from "@/types/ITripType";

const classOptions: Required<
  IDropdownSelectedOption<"economy" | "business" | "first" | "premium">
>[] = [
  {
    icon: FaE,
    label: "Economy",
    value: "economy",
  },
  {
    icon: FaB,
    label: "Business",
    value: "business",
  },
  {
    icon: FaF,
    label: "First Class",
    value: "first",
  },
  {
    icon: FaP,
    label: "Premium",
    value: "premium",
  },
];

const HeroSearch = ({
  type,
  showBtn = true,
}: {
  type: ITripType;
  showBtn?: boolean;
}) => {
  const [segmentsData, setSegmentsData] = useState<Partial<ISearchFlight>[]>([
    {},
  ]);

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

  const setSearchFlightSegments = useMyStore(
    (state) => state.setSearchFlightSegments
  );

  const [airportOptions, setAirportOptions] = useState<ISearchDropdownOption[]>(
    []
  );

  const router = useRouter();

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
          .slice(0, type === "Multi-city" ? undefined : 1)
          .map((segment, idx) => (
            <HeroSearchSegment
              key={idx}
              type={type}
              airportOptions={airportOptions}
              classOptions={classOptions}
              segmentIdx={idx}
              segment={segment}
              updateSegment={updateSegment}
              numSegments={segmentsData.length}
              removeSegment={removeSegment}
            />
          ))}
      </div>
      {type === "Multi-city" && (
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
      {showBtn && (
        <button
          onClick={() => {
            segmentsData.forEach((segment) => {
              if (
                segment.arrival_airport_id === undefined ||
                segment.departure_airport_id === undefined
              ) {
                return;
              }

              if (
                segment.passengers === undefined ||
                segment.departure_time === undefined ||
                segment.seat_class === undefined
              ) {
                return;
              }

              if (
                segment.departure_time.day === undefined ||
                segment.departure_time.month === undefined ||
                segment.departure_time.year === undefined
              ) {
                return;
              }
            });
            setSearchFlightSegments(segmentsData as ISearchFlight[]);
            router.push("/search");
          }}
          className="search-btn relative mt-4 w-full bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 "
        >
          <div
            className={
              "z-[5] bg-foreground h-full w-0 absolute top-0 left-0 transition-all duration-200 rounded-md "
            }
          ></div>
          <FaMagnifyingGlass className="z-[10] transition-all duration-200" />
          <span className="z-[10] transition-all duration-200">
            Search Flights
          </span>
        </button>
      )}
    </div>
  );
};

export default HeroSearch;
