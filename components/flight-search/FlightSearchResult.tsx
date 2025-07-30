import { ISearchResult } from "@/types/ISearchResult";
import Image from "next/image";
import { FaClock, FaPlane } from "react-icons/fa6";
import Separator from "../misc/Separator";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import BookButton from "./BookButton";
import { getDateAndTime } from "@/utils/getDateAndTime";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";

const FlightSearchResult = ({
  result,
  passengers,
}: {
  result: ISearchResult[];
  passengers: IPassengersSelectedOption;
}) => {
  const formatCurrency = useCurrencyFormatter()
  
  return (
    <div className="flex gap-6 bg-foreground-opposite p-4 px-6 rounded-lg shadow-md shadow-gray-900/40">
      <div className="flex flex-col gap-2 items-center justify-center">
        {result.map((segment, i) => {
          const [departureDate, departureTime] = getDateAndTime(
            segment.departure_time
          );
          const [arrivalDate, arrivalTime] = getDateAndTime(
            segment.arrival_time
          );

          return (
            <div
              key={"result-segment-" + i}
              className="flex gap-4 items-center justify-between w-full"
            >
              <div className="flex items-center justify-center gap-5">
                <Image
                  height={40}
                  width={40}
                  src={segment.airline_logo_url || "/pia.webp"}
                  alt="airline-logo"
                  className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] object-cover bg-foreground rounded-full"
                />

                <div className="flex items-center justify-between gap-4 basis-[290px] shrink-0 grow-[1]">
                  <div className="flex flex-col items-center justify-center gap-1 shrink-[1] grow-[1] basis-[100px] text-center">
                    <p className="font-semibold w-max">
                      {segment.departure_city}
                    </p>
                    <p className="text-sm text-gray-300 w-max">
                      {departureTime}
                    </p>
                    <p className="text-sm text-gray-300 w-max">
                      {departureDate}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <div className="basis-[40px] shrink-0 grow-[1] h-[1px] rounded-full bg-primary/50"></div>
                    <p className="text-sm w-[30px] text-center">
                      {segment.duration + "h"}
                    </p>
                    <div className="basis-[40px] grow-[1] shrink-0 h-[1px] rounded-full bg-primary/50"></div>
                    <FaPlane className="text-xs text-primary ml-[1px]" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 text-center shrink-[1] grow-[1] basis-[100px]">
                    <p className="font-semibold w-max">
                      {segment.arrival_city}
                    </p>
                    <p className="text-sm text-gray-300 w-max">{arrivalTime}</p>
                    <p className="text-sm text-gray-300 w-max">{arrivalDate}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold text-xl w-full">
          {formatCurrency(
            result.reduce(
              (a: number, b: ISearchResult) => a + b.segment_total_amount,
              0
            )
          )}
        </h3>

        <h4 className="flex items-center justify-center gap-[5px]">
          <FaClock className="" />
          <span>
            {result.reduce((a: number, b: ISearchResult) => a + b.duration, 0) +
              "h"}
          </span>
        </h4>

        <BookButton result={result} passengers={passengers} />
      </div>
    </div>
  );
};

export default FlightSearchResult;
