import { ISeatClass } from "@/types/ISeatClass";
import { IViewSegment } from "@/types/IViewBooking";
import { getDateAndTime } from "@/utils/getDateAndTime";
import React from "react";

const FlightDetails = ({
  city,
  airport_name,
  airport_code,
  time,
  heading,
  seat_class,
}: {
  city: string;
  airport_name: string;
  airport_code: string;
  time: string;
  heading: string;
  seat_class?: ISeatClass;
}) => {
  return (
    <div className="w-[50%]">
      <h2 className="text-md font-semibold text-foreground border-b-2 border-primary w-max mb-3">
        {heading}
      </h2>
      <div className="">
        <div className="flex justify-between items-center gap-2 p-1">
          <p>City:</p>
          <p className="text-primary">{city}</p>
        </div>
        <div className="flex justify-between items-center gap-2 p-1">
          <p>Airport Name:</p>
          <p className="text-primary">{airport_name}</p>
        </div>
        <div className="flex justify-between items-center gap-2 p-1">
          <p>Airport Code:</p>
          <p className="text-primary">{airport_code}</p>
        </div>
        {seat_class ? (
          <div className="flex justify-between items-center gap-2 p-1">
            <p>Seat Class:</p>
            <p className="text-primary">{seat_class}</p>
          </div>
        ) : null}
        <div className="flex justify-between items-center gap-2 p-1">
          <p>Time:</p>
          <p className="text-primary w-max">
            {(() => {
              const [date, t] = getDateAndTime(time, true);
              return date + " " + t;
            })()}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 p-1"></div>
    </div>
  );
};

export default FlightDetails;
