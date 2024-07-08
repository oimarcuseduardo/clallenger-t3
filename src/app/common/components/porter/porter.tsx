import React from "react";
import { type PorterType } from "./type";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

const Porter = (props: PorterType) => {
  return (
    <div className="sm:w-full; md:w-1/4; hover:ease-in-out; hover:bg-slate-950; relative scale-100 transform-gpu cursor-pointer rounded-b-xl rounded-t bg-white pb-8 shadow-xl ring-1 ring-gray-900/5 duration-300 hover:scale-105">
      <div className="absolute right-2 top-2 z-20">
        <Link href={`evento/atualizar/${props.id}`}>
          <button className="rounded-xl hover:text-pink-700 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-800 hover:text-pink-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </Link>

      </div>
      <Link href={`/evento/${props.id}`}>
        <div className="md:h-60; relative h-60 w-full overflow-hidden rounded-t bg-slate-200">
          <Image
            src={props.image}
            width="400"
            height={300}
            alt={`Poster - ${props.title}`}
          />
        </div>
        <div className="container mt-4 flex flex-col px-3">
          <h2 className="font-semibold text-pink-500">{props.title}</h2>
          <div className="text-xs text-slate-400">
            {format(props.date, "dd/MM/yyyy - hh:ii:ss")}
          </div>
          <div className="mt-2 h-20 text-xs text-slate-400/85">
            {props.description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export { Porter };
