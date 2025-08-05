import { IViewBookingResult } from "@/types/IViewBooking";
import React from "react";
import Separator from "../misc/Separator";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";

const Booking = ({ result }: { result: IViewBookingResult }) => {
  const formatCurrency = useCurrencyFormatter();
  return (
    <div
      className={`w-full mx-auto ${
        result.booking.status === "confirmed" ? "bg-green-700" : "bg-red-700"
      } rounded-lg p-4 shadow-lg shadow-background/80 flex flex-col gap-2`}
    >
      <div className="flex gap-3 justify-center items-center">
        <h2 className="font-bold text-lg text-foreground border-b-2 border-primary w-max">
          Booking #{result.booking.id}
        </h2>
        <div className="flex justify-between items-center gap-2 p-1 ml-auto">
          <p>Receipt Email:</p>
          <p
            className={`${
              result.booking.status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            }  p-1 text-foreground rounded-md`}
          >
            {result.booking.receipt_email}
          </p>
        </div>
        <div className="flex justify-between items-center gap-2 p-1">
          <p>Status:</p>
          <p
            className={
              result.booking.status === "confirmed"
                ? "bg-green-600 p-1 text-foreground rounded-md"
                : "bg-red-500 p-1 text-foreground rounded-md"
            }
          >
            {result.booking.status}
          </p>
        </div>
      </div>

      <Separator horizontal dark />

      <div className="flex gap-3 w-full justify-between items-center">
        <div className="flex justify-between items-center gap-2 p-1">
          <p>Base Amount:</p>
          <p
            className={`${
              result.booking.status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            } p-1 rounded-md`}
          >
            {formatCurrency(result.booking.base_amount)}
          </p>
        </div>

        <div className="flex justify-between items-center gap-2 p-1">
          <p>Surcharge Amount:</p>
          <p
            className={`${
              result.booking.status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            } p-1 rounded-md`}
          >
            {formatCurrency(result.booking.surcharge_amount)}
          </p>
        </div>

        <div className="flex justify-between items-center gap-2 p-1">
          <p>Tax Amount:</p>
          <p
            className={`${
              result.booking.status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            } p-1 rounded-md`}
          >
            {formatCurrency(result.booking.tax_amount)}
          </p>
        </div>

        <div className="flex justify-between items-center gap-2 p-1">
          <p>Total Amount:</p>
          <p
            className={`${
              result.booking.status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            } p-1 rounded-md`}
          >
            {formatCurrency(result.booking.total_amount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
