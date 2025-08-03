"use client";
import { FaPlus } from "react-icons/fa6";
import FlightSearchSegment from "./FlightSearchSegment";
import { seatClassOptions } from "@/types/ISeatClass";
import useAuthStore from "@/utils/useAuthStore";

const FlightSearchSegments = () => {
  const airportOptions = useAuthStore((s) => s.airportOptions);
  const segmentsData = useAuthStore((s) => s.segments);
  const addSegment = useAuthStore((s) => s.addSegment);
  const updateSegment = useAuthStore((s) => s.updateSegment);
  const removeSegment = useAuthStore((s) => s.removeSegment);
  const type = useAuthStore((s) => s.type);

  return (
    <div className="flex flex-col gap-2 justify-between">
      <div className="flex flex-col gap-4">
        {segmentsData
          .slice(0, type === "Multi-city" ? undefined : 1)
          .map((segment, idx) => (
            <FlightSearchSegment
              key={idx}
              type={type}
              airportOptions={airportOptions}
              classOptions={seatClassOptions}
              segmentIdx={idx}
              segment={segment}
              updateSegment={updateSegment}
              removeSegment={removeSegment}
              numSegments={segmentsData.length}
            />
          ))}
      </div>
      {type === "Multi-city" && segmentsData.length < 6 && (
        <button
          className="flex gap-2 items-center justify-center p-2 mt-1 rounded-md"
          onClick={() => {
            addSegment();
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
