import React, { forwardRef, type TextareaHTMLAttributes } from "react";
import { type InputProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps>((props, ref) => {
  const { error, ...inputProps } = props;

  return (
    <>
    <textarea
      {...inputProps}
      ref={ref}
      placeholder={props.placeholder}
      className="w-full px-3 py-3 text-sm font-extralight"
    />
          {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
    </>
  )
});

Textarea.displayName = 'textarea'


export { Textarea };
