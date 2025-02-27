import { Apply } from "./Apply";
import { Curriculum } from "./Curriculum";
export interface Coverletter {
  text: string;
  apply: Apply;
  curriculum: Curriculum;
  isShort: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
