import { IViewSegment } from "@/types/IViewBooking";
import { getDateAndTime } from "@/utils/getDateAndTime";
import React from "react";

const PassengerDetails = ({ segment }: { segment: IViewSegment }) => {
  return (
    <div className="w-[50%]">
      <h2 className="text-md font-semibold text-foreground border-b-2 border-primary w-max mb-3">
        Passenger Info:
      </h2>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Full Name:</p>
        <p className="text-primary text-right capitalize">
          {segment.full_name}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Passenger Type:</p>
        <p className="text-primary text-right capitalize">
          {segment.passenger_type}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Gender:</p>
        <p className="text-primary text-right capitalize">{segment.gender}</p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Nationality:</p>
        <p className="text-primary text-right capitalize">
          {segment.nationality}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Date of Birth:</p>
        <p className="text-primary text-right capitalize">
          {getDateAndTime(segment.date_of_birth, true)[0]}
        </p>
      </div>
    </div>
  );
};

export default PassengerDetails;
