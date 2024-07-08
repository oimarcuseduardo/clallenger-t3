import React from "react";
import { type ContainerType } from "./types";

const Container = (props: ContainerType) => {
  return <div className={`container ${props.className}`}>{props.children}</div>;
};

export { Container }
