import { ChangeEventHandler } from "react";

const Input = (props: {
  type: any;
  id: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  required?: boolean;
}) => {
  return (
    <input
      className="bg-[#515151] p-2 text-light rounded-md"
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      required={props.required ?? true}
    />
  );
};

export default Input;
