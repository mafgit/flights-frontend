import {
  FaPlaneDeparture,
} from "react-icons/fa6";
import Typing from "./Typing";
import FlightSearchForm from "../flight-search/FlightSearchForm";

const Hero = () => {
  return (
    <div
      id="hero"
      className="bg-gradient-to-r from-primary to-primary-shade text-light"
    >
      <div className="flex flex-col gap-8 p-8 py-12 pt-16 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-3">
            {/* <Image src={"/next.svg"} width={100} height={100} alt="logo" className="inline" /> */}
            <FaPlaneDeparture className="text-6xl text-light" />
            <h1 className="font-bold text-4xl inline">Flight Booker</h1>
          </div>
          <Typing />
        </div>

        <FlightSearchForm />
      </div>
    </div>
  );
};

export default Hero;
