import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import { IBookingPassenger } from "@/types/IBookingPassenger";
import { IBookingSegment } from "@/types/IBookingSegment";
import { getDateAndTime } from "@/utils/getDateAndTime";
import Image from "next/image";
import { FaPlane } from "react-icons/fa6";
import BookingPriceSection from "./BookingPriceSection";
import Separator from "../misc/Separator";
import SeatClassSpan from "../flight-search/SeatClassSpan";

const BookingSegment = ({
  segment,
  passengers,
  formatCurrency,
}: {
  segment: IBookingSegment;
  passengers: IBookingPassenger[];
  formatCurrency: (amount: number) => string;
}) => {
  const [departureDate, departureTime] = getDateAndTime(segment.departure_time);
  const [arrivalDate, arrivalTime] = getDateAndTime(segment.arrival_time);

  let adults = 0,
    infants = 0,
    children = 0;
  passengers.forEach((p) => {
    if (p.passenger_type === "infant") infants++;
    else if (p.passenger_type === "child") children++;
    else adults++;
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-between w-max rounded-lg bg-foreground-opposite p-4 px-5  shadow-md shadow-gray-900/40">
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            height={40}
            width={40}
            src={segment.airline_logo_url || "/pia.webp"}
            alt="airline-logo"
            className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] object-cover bg-foreground rounded-full"
          />
          <SeatClassSpan seatClass={segment.seat_class} />
        </div>
        <div className="flex items-center justify-between gap-4 basis-[290px] shrink-0 grow-[1]">
          <div className="flex flex-col items-center justify-center gap-1 shrink-[1] grow-[1] basis-[100px] text-center">
            <p className="font-semibold w-max">{segment.departure_city}</p>
            <p className="text-sm text-gray-300 w-max">{departureTime}</p>
            <p className="text-sm text-gray-300 w-max">{departureDate}</p>
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
            <p className="font-semibold w-max">{segment.arrival_city}</p>
            <p className="text-sm text-gray-300 w-max">{arrivalTime}</p>
            <p className="text-sm text-gray-300 w-max">{arrivalDate}</p>
          </div>
        </div>
      </div>

      <Separator horizontal />
      <div className="w-full flex flex-col gap-4">
        <BookingPriceSection
          adultAmount={segment.adult_base_amount}
          childAmount={segment.child_base_amount}
          infantAmount={segment.infant_base_amount}
          adultCount={adults}
          childCount={children}
          infantCount={infants}
          formatCurrency={formatCurrency}
          sectionHeading="Base Amount"
        />

        <BookingPriceSection
          adultAmount={segment.tax_amount}
          childAmount={segment.tax_amount}
          infantAmount={segment.tax_amount}
          adultCount={adults}
          childCount={children}
          infantCount={infants}
          formatCurrency={formatCurrency}
          sectionHeading="Tax Amount"
        />

        <BookingPriceSection
          adultAmount={segment.surcharge_amount}
          childAmount={segment.surcharge_amount}
          infantAmount={segment.surcharge_amount}
          adultCount={adults}
          childCount={children}
          infantCount={infants}
          formatCurrency={formatCurrency}
          sectionHeading="Surcharge Amount"
        />
      </div>

      <h2 className=" w-full p-2 bg-background rounded-md text-center">
        Segment Total: {formatCurrency(segment.segment_total_amount)}
      </h2>
    </div>
  );
};

export default BookingSegment;
