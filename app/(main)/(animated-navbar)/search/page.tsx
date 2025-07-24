"use client";

import { searchFlights } from "@/app/services/search";
import HeroSearch from "@/components/hero/HeroSearch";
import Loading from "@/components/Loading";
import SearchFilters from "@/components/SearchFilters";
import SearchFlightsForm from "@/components/SearchFlightsForm";
import SearchResult from "@/components/SearchResult";
import { ISearchResult } from "@/types/ISearchResult";
import useMyStore from "@/utils/useMyStore";
import { useEffect, useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";

const SearchPage = () => {
  const searchFlightSegments = useMyStore((s) => s.searchFlightsSegments);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ISearchResult[][]>([]);

  useEffect(() => {
    console.log("searchFlightSegments", searchFlightSegments);

    if (searchFlightSegments.length === 0) return;
    setLoading(true);
    searchFlights(searchFlightSegments)
      .then((results) => {
        console.log("results:", results);
        setResults(results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [searchFlightSegments]);

  return (
    <div className="mx-auto flex flex-col items-center">
      {/* <div className="w-full h-[1px] rounded-full bg-foreground/20 mb-4 mt-6 bg-gradient-to-r from-foreground-opposite via-foreground/30 to-foreground-opposite"></div> */}
      <div
        id="hero"
        className="w-full py-12"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundPosition: "center 150%",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      >
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2  p-4">
          <FaPlaneDeparture className="mr-2"/> Search Results{" "}
          <span className="font-normal text-[16px] text-foreground/70">
            ({results.length})
          </span>
        </h1>
        <div className="w-full p-4 max-w-[1300px] mx-auto">
          {" "}
          <SearchFlightsForm showBtn={false} />
        </div>
      </div>
      {/* <div className="w-full h-[1px] rounded-full bg-foreground/20 mt-4 mb-0 bg-gradient-to-r from-foreground-opposite via-foreground/30 to-foreground-opposite"></div> */}

      <div className="w-full">
        <div className="flex gap-6 h-full items-center justify-start w-full min-h-[100px] mt-8 max-w-[1300px] mx-auto">
          <SearchFilters />
          <div className="flex items-center justify-start gap-3 flex-col h-full  self-start">
            {loading ? (
              <Loading />
            ) : results !== undefined && results.length === 0 ? (
              <h3 className="text-xl text-center w-max ">No result found</h3>
            ) : (
              results.map((r, i) => (
                <SearchResult result={r} key={"result-" + i} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
