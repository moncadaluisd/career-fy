import { Coverletter } from "./Coverletter";

export interface Apply {
  _id: string;
  url: string;
  name: string;
  description: string;
  status: string;
  tags: string[];
  location: string;
  typeWork: string;
  salary: string;
  company: string;
  createdAt: Date;
  updatedAt: Date;
  coverLetters: Coverletter[];
}

export interface ApplyWithCoverLetters extends Apply {
  coverLetters: Coverletter[];
}
