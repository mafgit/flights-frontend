"use client";
import { useEffect, useRef, useState } from "react";

const importantWords = ["consectetur", "Dolorem"];

const Typing = ({
  text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem eos quisquam officia voluptas perspiciatis aliquam? highlight text react.",
}: {
  text?: string;
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [shownText, setShownText] = useState("");
  const delay = useRef(50);

  useEffect(() => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    if (text !== shownText) {
      timeoutRef.current = setTimeout(() => {
        setShownText((prev) => {
          if (prev === text) {
            return text;
          } else {
            let newChar = text[prev.length];
            if (newChar === "." || newChar === "?") {
              delay.current = 600;
            } else {
              delay.current = 50;
            }
            return prev + newChar;
          }
        });
      }, delay.current);
    }
  }, [shownText]);

  return (
    <h2 className="font-semibold text-2xl transition-all duration-100 min-h-[68px]">
      {shownText.split(/\s+/).map((word, i) =>
        importantWords.includes(word) ? (
          <span className="text-amber-300" key={"word-" + i}>
            {word + " "}
          </span>
        ) : (
          word + " "
        )
      )}{" "}
      <span className="animate-typing text-primary-shade rounded-xl inline-block text-3xl">
        |
      </span>
    </h2>
  );
};

export default Typing;
