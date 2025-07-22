"use client";
import { useState } from "react";
import Dropdown, { DropdownSelectedOption } from "./Dropdown";
import HeroSearch from "./HeroSearch";
// import Image from "next/image";
import { FaPlaneDeparture } from "react-icons/fa6";

const Hero = () => {
  const [selectedTypeOption, setSelectedTypeOption] = useState<
    DropdownSelectedOption<string>
  >({ value: "One-way", label: "One-way" });

  return (
    <div className="bg-gradient-to-r from-primary via-primary-shade to-primary-shade-2">
      <div className="flex flex-col gap-8 p-8 py-12 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-3 ">
            {/* <Image src={"/next.svg"} width={100} height={100} alt="logo" className="inline" /> */}
            <FaPlaneDeparture className="text-6xl text-foreground" />
            <h1 className="font-bold text-4xl inline">Flight Booker</h1>
          </div>
          <h2 className="font-semibold text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eos quisquam officia voluptas perspiciatis aliquam.
          </h2>
        </div>

        <div className="">
          <Dropdown
            options={[
              { label: "One-way", value: "One-way" },
              { label: "Round-trip", value: "Round-trip" },
              { label: "Multi-city", value: "Multi-city" },
            ]}
            selectedOption={selectedTypeOption}
            setSelectedOption={setSelectedTypeOption}
          />

          <HeroSearch />
        </div>
      </div>
    </div>
  );
};

export default Hero;
