import React, { ChangeEventHandler } from "react";
import Input from "./basic/Input";

const FormField = (props: {
  label: string;
  type: any;
  id: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string | number;
  required?: boolean
}) => {
  return (
    <div className="">
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
};

export default FormField;
