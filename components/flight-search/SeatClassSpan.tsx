import { ISeatClass } from "@/types/ISeatClass";
import React from "react";

const SeatClassSpan = ({ seatClass }: { seatClass: ISeatClass }) => {
  return (
    <span
      className={
        "p-1 rounded-md text-sm capitalize w-full text-center " +
        (seatClass === "first"
          ? "bg-gradient-to-bl from-[#D4AF37] to-[#B8860B] font-semibold"
          : seatClass === "business"
          ? "bg-gradient-to-bl from-[#4737d4] to-[#870bb8] font-semibold"
          : seatClass === "premium"
          ? "bg-gradient-to-bl from-[#37c9d4] to-[#0b81b8] font-semibold"
          : "bg-gradient-to-bl from-[#70d437] to-[#0bb853] font-semibold")
      }
    >
      {seatClass}
    </span>
  );
};

export default SeatClassSpan;
