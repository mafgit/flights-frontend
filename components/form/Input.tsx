import { ChangeEventHandler } from "react";

const Input = (props: {
  type: any;
  id: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  required?: boolean
}) => {
  return (
    <input value={props.value} onChange={props.onChange} type={props.type} id={props.id} placeholder={props.placeholder} required={props.required ?? true}/>
  );
};

export default Input;
