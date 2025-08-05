import { FaPlaneDeparture } from "react-icons/fa6";

const Loading = ({ message = "Loading" }: { message?: string }) => {
  return (
    <div className="loading-anim w-full h-full flex items-center justify-center min-h-[100px]">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="animate-spin border-r-1 border-l-1 w-[30px] h-[30px] rounded-full"></div>
        <p className=" flex gap-2 justify-center items-center">
          <FaPlaneDeparture className="" />
          <span className="tracking-widest uppercase text-sm">
            {message}
          </span>{" "}
          {/* <span className="text-xs">...</span> */}
        </p>
      </div>
    </div>
  );
};

export default Loading;
