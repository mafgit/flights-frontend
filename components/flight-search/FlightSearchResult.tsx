import { ISearchResult } from "@/types/ISearchResult";
import Image from "next/image";
import { FaPlane } from "react-icons/fa6";
import Separator from "../misc/Separator";

function getDateAndTime(iso: string) {
  let date = new Date(iso);

  let date2 = date.toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    day: "numeric",
    month: "short",
    // year: 'numeric',
    hour: "numeric",
    minute: "2-digit",
  });

  const [month, day, time, am] = date2.replace(/,/g, "").split(" ");
  return [day + " " + month, time + " " + am];
}

const SearchResult = ({ result }: { result: ISearchResult[] }) => {
  return (
    <div className="flex gap-6 bg-foreground-opposite p-4 px-6 rounded-md">
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
              className="flex gap-4 items-center justify-center"
            >
              <div className="flex items-center justify-center gap-5">
                <Image
                  height={40}
                  width={40}
                  src={segment.airline_logo_url || "/pia.webp"}
                  alt="airline-logo"
                  className="bg-foreground rounded-full"
                />

                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="font-semibold">{segment.departure_city}</p>
                    <p className="text-sm text-gray-300">{departureTime}</p>
                    <p className="text-sm text-gray-300">{departureDate}</p>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <div className="w-[40px] h-[1px] rounded-full bg-primary/50"></div>
                    <p className="text-sm">{segment.duration + "h"}</p>
                    <div className="w-[40px] h-[1px] rounded-full bg-primary/50"></div>
                    <FaPlane className="text-xs text-primary" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <p className="font-semibold">{segment.arrival_city}</p>
                    <p className="text-sm text-gray-300">{arrivalTime}</p>
                    <p className="text-sm text-gray-300">{arrivalDate}</p>
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

        <button className="relative bg-primary-shade rounded-md p-2 w-full group flex items-center justify-center">
          <div className="top-0 left-0 absolute h-full bg-foreground rounded-md z-[5] w-0 transition-all duration-200 group-hover:w-full"></div>
          <p className="z-[10] transition-all duration-200 block group-hover:text-primary-shade">
            Book
          </p>
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
