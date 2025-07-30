const BookingPriceSection = ({
  sectionHeading,
  formatCurrency,
  adultAmount,
  childAmount,
  infantAmount,
  adultCount,
  childCount,
  infantCount,
}: {
  sectionHeading: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  formatCurrency: (amount: number) => string;
  infantAmount: number;
  childAmount: number;
  adultAmount: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-center text-md">{sectionHeading}:</h2>

      <div className="flex gap-2 items-start justify-center text-gray-300">
        <span className="">Adults:</span>
        <h1 className="flex justify-between w-full">
          <span>
            {formatCurrency(adultAmount)} × {adultCount}
          </span>
          <span className="text-primary font-bold">
            = {formatCurrency(adultAmount * adultCount)}
          </span>
        </h1>
      </div>

      {childCount > 0 && (
        <div className="flex gap-2 items-start justify-center text-gray-300">
          <span className="">Children:</span>
          <h1 className="flex justify-between w-full">
            <span>
              {formatCurrency(childAmount)} × {childCount} ={" "}
            </span>
            <span className="text-primary font-bold">
              {formatCurrency(childAmount * childCount)}
            </span>
          </h1>
        </div>
      )}

      {infantCount > 0 && (
        <div className="flex gap-2 items-start justify-center text-gray-300">
          <span className="">Infants:</span>
          <h1 className="flex justify-between w-full">
            <span>
              {formatCurrency(infantAmount)} × {infantCount} ={" "}
            </span>
            <span className="text-primary font-bold">
              {formatCurrency(infantAmount * infantCount)}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default BookingPriceSection;
