import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import { IViewSegment } from "@/types/IViewBooking";
import React from "react";

const PriceDetails = ({ segment }: { segment: IViewSegment }) => {
  const formatCurrency = useCurrencyFormatter();

  return (
    <div className="w-[50%]">
      <h2 className="text-md font-semibold text-foreground border-b-2 border-primary w-max mb-3">
        Price Info:
      </h2>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Base Amount:</p>
        <p className="text-primary text-right capitalize">{formatCurrency(segment.base_amount)}</p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Tax Amount:</p>
        <p className="text-primary text-right capitalize">{formatCurrency(segment.tax_amount)}</p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Surcharge Amount:</p>
        <p className="text-primary text-right capitalize">
          {formatCurrency(segment.surcharge_amount)}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 p-1">
        <p>Total Amount:</p>
        <p className="text-primary text-right capitalize">{formatCurrency(segment.total_amount)}</p>
      </div>
    </div>
  );
};

export default PriceDetails;
