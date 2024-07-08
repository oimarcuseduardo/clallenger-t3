import { type STATUS_PUBLICATION } from "./enum.type";

type EventType = {
  title: string;
  date: Date;
  description: string;
  address: string;
  status: STATUS_PUBLICATION;
};

export type {EventType}
