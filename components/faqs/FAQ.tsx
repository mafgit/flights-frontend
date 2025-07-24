"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const FAQ = ({ q, a }: { q: string; a: string }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative text-left mx-auto align-top self-start max-w-[500px] bg-foreground-opposite  rounded-md p-2 px-4 hover:bg-foreground hover:text-foreground-opposite transition-all duration-200">
      <button
        className="flex justify-between w-full gap-2 items-center min-w-full z-10 min-h-[70px]"
        onClick={() => setOpened(!opened)}
      >
        <h4 className="font-semibold text-left">{q}</h4>
        {opened ? (
          <FaChevronUp className="text-primary text-sm" />
        ) : (
          <FaChevronDown className="text-primary text-sm" />
        )}
      </button>
      <p
        className={
          "transition-all transform duration-200 ease-in z-0 overflow-y-auto " +
          (opened
            ? "opacity-100 -translate-y-[0px] max-h-[150px]"
            : "opacity-0 -translate-y-[20px] max-h-0")
        }
      >
        {a}
      </p>
    </div>
  );
};

export default FAQ;
