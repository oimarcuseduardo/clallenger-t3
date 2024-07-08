import React, { type InputHTMLAttributes } from "react";
import { type InputProps } from "./types";

const Input = (props: InputHTMLAttributes<HTMLInputElement> & InputProps) => {
  return (
    <>
      <input
        {...props}
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className="w-full px-3 py-3 text-sm font-extralight"
      />
      {props.error && <div className="text-xs text-red-500 mt-2">{props.error}</div>}
    </>
  );
};

export { Input };
