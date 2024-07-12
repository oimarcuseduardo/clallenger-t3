import React, { forwardRef, type InputHTMLAttributes } from "react";
import { type InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & InputProps>((props, ref) => {
  const { error, ...inputProps } = props;

  return (
    <>
      <input
        {...inputProps}
        ref={ref}
        placeholder={props.placeholder}
        className="w-full px-3 py-3 text-sm font-extralight"
      />
      {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
    </>
  )
});

Input.displayName = 'input'

export { Input };
