import { ISearchFlight } from "@/types/ISearchFlight";
import { findByCity } from "@/utils/cityImages";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

const SearchImages = ({ segments }: { segments: Partial<ISearchFlight>[] }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-start h-full self-start">
      {segments.length &&
        segments.map((s) => {
          if (!s?.arrival_airport?.city) return null;

          const images = findByCity(
            s.arrival_airport.city
            // , s.arrival_airport.country
          );

          if (images.length === 0) return null;

          const { image_url, city, country, id, label } = images[0];

          return (
            <div
              className="rounded-lg relative z-[5] w-full h-[150px] shadow-xl shadow-background/80 "
              key={`image-${id}-${city}`}
            >
              <Image
                src={image_url}
                height={1000}
                width={1000}
                alt={label}
                className="w-full h-full z-[5] object-cover rounded-lg "
              />

              <div className="opacity-100 duration-200 bg-gradient-to-b from-black/30 via-black/30 via-65%% to-black/60 z-[7] rounded-lg absolute top-0 left-0 w-full h-full"></div>

              <div className="bg-black/0 w-full h-[40px] absolute bottom-0 rounded-b-lg left-0 z-[10] flex flex-col gap-0 justify-center items-start">
                <div className="w-full z-[10] flex flex-col gap-1 justify-center items-center">
                  <h3 className="flex gap-2 items-center justify-center z-[10]">
                    <span>
                      <FaLocationDot className="text-primary" />
                    </span>
                    <span className="tracking-widest uppercase">{city}</span>
                    <span className="text-light/90 tracking-widest uppercase text-sm">
                      {country}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchImages;
