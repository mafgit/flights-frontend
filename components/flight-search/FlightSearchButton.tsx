import { FaMagnifyingGlass } from "react-icons/fa6";

const FlightSearchButton = ({
  onSearchClick,
}: {
  onSearchClick: () => void;
}) => {
  return (
    <button
      onClick={onSearchClick}
      className="search-btn relative mt-4 w-full bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 "
    >
      <div
        className={
          "z-[5] bg-foreground h-full w-0 absolute top-0 left-0 transition-all duration-200 rounded-md "
        }
      ></div>
      <FaMagnifyingGlass className="z-[10] transition-all duration-200" />
      <span className="z-[10] transition-all duration-200">Search Flights</span>
    </button>
  );
};

export default FlightSearchButton;
