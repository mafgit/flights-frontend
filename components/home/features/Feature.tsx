import React from "react";

const Feature = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="feature transition-all duration-200 ease-in-out w-[350px] h-[250px] flex flex-col  rounded-lg bg-foreground-opposite shadow-lg/30 shadow-black/40">
      <div className="h-[150px] max-h-[150px] w-full rounded-t-lg transition-all duration-200 ease-in-out">
        <img
          src={imgUrl}
          width={350}
          height={150}
          className="transition-all duration-200 ease-in-out w-[350px] h-[150px] object-cover bg-foreground rounded-t-lg pointer-events-none"
        />
      </div>
      <div className="h-[100px] max-h-[100px] transition-all duration-200 ease-in-out bg-foreground-opposite w-full rounded-b-lg flex flex-col text-center items-center justify-center">
        <h4 className="font-semibold text-lg transition-all duration-200 ease-in-out">
          We offer this and this for this and that
        </h4>

        <p className="max-h-0 opacity-0 transition-all duration-200 ease-in-out pointer-events-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ex
          cupiditate. Magnam eaque pariatur voluptate!
        </p>
      </div>
    </div>
  );
};

export default Feature;
