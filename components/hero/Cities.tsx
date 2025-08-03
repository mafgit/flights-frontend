"use client";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import { findByCity } from "@/utils/cityImages";
import useAuthStore from "@/utils/useAuthStore";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import Loading from "../misc/Loading";

const cities = [
  "Lahore",
  "New York",
  "London",
  "Dubai",
  "Mountain View",
  "Karachi",
];

const Cities = () => {
  const formatCurrency = useCurrencyFormatter();
  const city = useAuthStore((s) => s.city);
  const loading = useAuthStore((s) => s.loading);

  return (
    <div className="max-w-[1300px] p-8 py-8 mx-auto flex items-center justify-center gap-6 flex-col">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="font-bold text-2xl text-foreground border-b-2 border-primary">
            Suggested Trips From {city}
          </h2>

          <div className="grid gap-x-4 gap-y-8 items-center grid-cols-4 justify-around place-items-center cursor-pointer">
            {cities
              .filter((c) => c !== city)
              .map((c) => {
                const images = findByCity(c);
                if (images.length === 0) return null;
                const { image_url, city, country, id, label } = images[0];
                return (
                  <div
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-lg relative z-[5] max-w-[300px] h-[300px] shadow-xl shadow-background/80 group transition-all duration-200 ease-in-out"
                    key={`image-${id}-${city}`}
                  >
                    <Image
                      src={image_url}
                      height={1000}
                      width={1000}
                      alt={label}
                      className="w-full h-full z-[5] object-cover rounded-lg "
                    />

                    <div className="opacity-100 group-hover:opacity-0 transition-all duration-200 ease-in-out bg-gradient-to-b from-black/30 via-black/30 via-65%% to-black/60 z-[7] rounded-lg absolute top-0 left-0 w-full h-full"></div>

                    <div className="group-hover:bg-black/80 group-hover:py-12 bg-black/0 w-full h-[70px] absolute bottom-0 rounded-b-lg left-0 transition-all duration-300 ease-in-out z-[10] flex flex-col gap-0 justify-center items-start">
                      <div className="w-full z-[10] flex flex-col gap-1 justify-center items-center">
                        <h3 className="flex gap-2 items-center justify-center z-[10]">
                          <span>
                            <FaLocationDot className="text-primary" />
                          </span>
                          <span className="tracking-widest uppercase">
                            {city}
                          </span>
                          <span className="text-light/90 tracking-widest uppercase text-sm">
                            {country}
                          </span>
                        </h3>

                        <h3 className="flex text-sm gap-1 items-center justify-center">
                          <span className="text-light/90">Starting from</span>
                          <span className="font-bold text-light/90">
                            {formatCurrency(1000)}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Cities;
