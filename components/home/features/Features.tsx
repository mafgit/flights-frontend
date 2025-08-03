import React from "react";
import Feature from "./Feature";

const Features = () => {
  return (
    <div className="max-w-[1300px] flex flex-col gap-6 items-center justify-center mx-auto p-8 py-8">
      <h2 className="font-bold text-2xl text-foreground border-b-2 border-primary">Services We Provide</h2>

      <div className="mx-auto flex flex-wrap w-full items-center justify-center gap-4">
        <Feature />
        <Feature />
        <Feature />
      </div>
    </div>
  );
};

export default Features;
