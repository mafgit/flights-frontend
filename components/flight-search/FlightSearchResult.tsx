import { ISearchResult } from "@/types/ISearchResult";
import Image from "next/image";
import { FaClock, FaCreditCard, FaDollarSign, FaMoneyBill, FaPlane } from "react-icons/fa6";
import Separator from "../misc/Separator";

function getDateAndTime(iso: string, timezoneOfDisplay?: string) {
  let date = new Date(iso);

  let date2 = date.toLocaleString("en-US", {
    timeZone:
      timezoneOfDisplay ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: "numeric",
    month: "short",
    // year: 'numeric',
    hour: "numeric",
    minute: "2-digit",
  });

  const [month, day, time, am] = date2.replace(/,/g, "").split(" ");
  return [day + " " + month, time + " " + am];
}

const FlightSearchResult = ({ result }: { result: ISearchResult[] }) => {
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
          {"PKR " +
            result.reduce(
              (a: number, b: ISearchResult) => a + b.segment_total_amount,
              0
            )}
        </h3>

        <h4 className="flex items-center justify-center gap-[5px]">
          <FaClock className="" />
          <span>
            {result.reduce((a: number, b: ISearchResult) => a + b.duration, 0) +
              "h"}
          </span>
        </h4>

        <button className="relative bg-primary-shade rounded-md p-2 w-full group flex items-center justify-center">
          <div className="top-0 left-0 absolute h-full bg-foreground rounded-md z-[5] w-0 transition-all duration-200 group-hover:w-full"></div>
          <p className="z-[10] transition-all duration-200 group-hover:text-primary-shade flex items-center justify-center gap-[5px]">
            <FaCreditCard /> <span>Book</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default FlightSearchResult;
