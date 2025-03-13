import { Apply } from "./Apply";
import { Curriculum } from "./Curriculum";

export interface Message {
  _id: string;
  message: string;
  text: string;
}

export interface Coverletter {
  _id: string;
  text: string;
  apply?: Apply;
  curriculum?: Curriculum;
  isShort: boolean;
  version: number;
  message?: Message[];
  createdAt: Date;
  updatedAt: Date;
}
