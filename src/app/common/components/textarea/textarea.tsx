import React, { TextareaHTMLAttributes, type InputHTMLAttributes } from "react";
import { type InputProps } from "./types";

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps) => {
    return (
    <textarea
    {...props}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      className="w-full px-3 py-3 text-sm font-extralight"
    />
  );
};

export { Textarea };
