"use client";
import { getCityImages } from "@/app/services/flights";
import { ISearchFlight } from "@/types/ISearchFlight";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const SearchImages = ({ segments }: { segments: Partial<ISearchFlight>[] }) => {
  const [images, setImages] = useState<
    { city: string; image_url: string; country: string }[]
  >([]);

  useEffect(() => {
    if (
      segments.length === 0 ||
      segments.some(
        (s) =>
          s.arrival_airport === undefined ||
          s.arrival_airport.city === undefined ||
          s.arrival_airport.country === undefined
      )
    )
      return;

    getCityImages(
      segments.map((s) => ({
        city: s.arrival_airport!.city!,
        country: s.arrival_airport!.country!,
      }))
    )
      .then((images) => {
        console.log(images);
        setImages(images);
      })
      .catch((e) => console.log(e));
  }, [segments]);

  return (
    <div className="flex flex-col gap-4 items-center justify-start h-full self-start">
      {images.length > 0 ? (
        images.map((image, i) => {
          return (
            <div
              className="rounded-lg relative z-[5] w-full h-[150px] shadow-xl shadow-background/80 "
              key={`image-${i}`}
            >
              <Image
                src={image.image_url}
                height={1000}
                width={1000}
                alt={image.city}
                className="w-full h-full z-[5] object-cover rounded-lg "
              />

              <div className="opacity-100 duration-200 bg-gradient-to-b from-black/30 via-black/30 via-65%% to-black/60 z-[7] rounded-lg absolute top-0 left-0 w-full h-full"></div>

              <div className="bg-black/0 w-full h-[40px] absolute bottom-0 rounded-b-lg left-0 z-[10] flex flex-col gap-0 justify-center items-start">
                <div className="w-full z-[10] flex flex-col gap-1 justify-center items-center">
                  <h3 className="flex gap-2 items-center justify-center z-[10]">
                    <span>
                      <FaLocationDot className="text-primary" />
                    </span>
                    <span className="tracking-widest uppercase">
                      {image.city}
                    </span>
                    <span className="text-light/90 tracking-widest uppercase text-sm">
                      {image.country}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchImages;
