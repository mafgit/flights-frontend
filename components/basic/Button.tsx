import { MouseEventHandler } from "react";

const Button = (props: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
}) => {
  return (
    <button
      className="cursor-pointer"
      type={props.type ?? "button"}
      onClick={props.onClick ?? ((e) => {})}
    >
      {props.text}
    </button>
  );
};

export default Button;
