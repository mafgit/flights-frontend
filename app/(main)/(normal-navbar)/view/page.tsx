"use client";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import { getOneBooking } from "@/app/services/bookings";
import Booking from "@/components/booking/Booking";
import FlightDetails from "@/components/booking/FlightDetails";
import PassengerDetails from "@/components/booking/PassengerDetails";
import PriceDetails from "@/components/booking/PriceDetails";
import Loading from "@/components/misc/Loading";
import Separator from "@/components/misc/Separator";
import { IViewBookingResult } from "@/types/IViewBooking";
import { getDateAndTime } from "@/utils/getDateAndTime";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const ViewBookingPage = () => {
  const params = useSearchParams();
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<null | IViewBookingResult>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formatCurrency = useCurrencyFormatter();

  useEffect(() => {
    const id = parseInt(params.get("id") || "");
    setSearchId(params.get("id") || "");
    if (!id || isNaN(id)) {
      setResult(null);
    } else {
      setLoading(true);
      getOneBooking(id)
        .then((data) => {
          setResult(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setResult(null);
        })
        .finally(() => setLoading(false));
    }
  }, [params]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (searchId && !isNaN(parseInt(searchId))) {
      router.push("/view?id=" + searchId);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex items-center justify-center flex-col gap-5  my-8">
        <h1 className="text-3xl font-bold">
          View Booking By Entering Booking ID
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-[80%] flex justify-center gap-2 items-center"
        >
          <input
            className="bg-foreground w-[90%] rounded-md px-4 py-2 text-dark"
            onChange={(e) => setSearchId(e.target.value)}
            value={searchId}
            required
            placeholder="Enter Booking ID e.g. 26"
          />
          <button className="bg-primary-shade p-2 rounded-md">Search</button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <Loading />
        ) : !result ? (
          <p>Not found</p>
        ) : (
          <>
            <Booking result={result} />

            <div className="flex flex-wrap gap-x-4 gap-y-8 mx-auto w-full justify-between items-center">
              {result.segments.map((segment, i) => (
                <div
                  key={"view-segment-" + i}
                  className="bg-foreground-opposite p-4 px-6 rounded-lg shadow-lg shadow-background/80 w-[49%] flex flex-col place-self-start"
                >
                  <h2 className="font-bold text-lg text-foreground border-b-2 border-primary w-max mx-auto mb-3">
                    Segment #{i + 1}
                  </h2>

                  <div className="flex gap-3 justify-between">
                    <PassengerDetails segment={segment} />
                    <PriceDetails segment={segment} />
                  </div>
                  <div className="flex gap-3 justify-between">
                    <FlightDetails
                      heading="Departure Details:"
                      airport_code={segment.departure_airport_code}
                      airport_name={segment.departure_airport_name}
                      city={segment.departure_city}
                      time={segment.departure_time}
                      seat_class={segment.seat_class}
                    />
                    <FlightDetails
                      heading="Arrival Details:"
                      airport_code={segment.arrival_airport_code}
                      airport_name={segment.arrival_airport_name}
                      city={segment.arrival_city}
                      time={segment.arrival_time}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBookingPage;
