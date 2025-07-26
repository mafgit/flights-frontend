"use client";
import { fetchSomeAirlines } from "@/app/services/airlines";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

const HomepageAirlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetchSomeAirlines(5).then((returnedAirlines) => {
      setAirlines(returnedAirlines.map((a: { logo_url: string }) => a.logo_url));
    })
  }, []);

  return (
    <div className=" p-8 py-8 mt-4 flex items-center justify-center gap-6 flex-col">
      <h2 className="font-bold text-2xl text-foreground border-b-2 border-primary">
        Fly all over the world!
      </h2>

      <div className=" flex items-center justify-center gap-8 ">
        {airlines.map((src, i) => (
          <Image
            src={src}
            width={100}
            height={100}
            className="object-cover bg-foreground rounded-full min-w-[100px] min-h-[100px] w-[100px] max-w-[100px] h-[100px] max-h-[100px] hover:scale-[115%] border-2 border-foreground hover:border-primary transition-all duration-400 ease-in-out hover:contrast-125 hover:brightness-90 hover:saturate-[125%]"
            alt="logo"
            key={"logo-" + i}
          />
        ))}
        <FaEllipsis className="text-3xl" />
      </div>
    </div>
  );
};

export default HomepageAirlines;
