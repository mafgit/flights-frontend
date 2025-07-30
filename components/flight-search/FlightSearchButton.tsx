import { FaMagnifyingGlass } from "react-icons/fa6";

const FlightSearchButton = ({
  onSearchClick,
  searchPage,
}: {
  onSearchClick: () => void;
  searchPage?: boolean;
}) => {
  return (
    <button
      onClick={onSearchClick}
      className="group relative mt-2 w-full bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 "
    >
      <div
        className={
          "group-hover:w-full z-[5] bg-foreground h-full w-0 absolute top-0 left-0 transition-all duration-200 rounded-md "
        }
      ></div>
      <FaMagnifyingGlass className="group-hover:text-primary z-[10] transition-all duration-200" />
      <span className="group-hover:text-primary z-[10] transition-all duration-200">
        {!searchPage ? "Search Flights" : "Update Results"}
      </span>
    </button>
  );
};

export default FlightSearchButton;
