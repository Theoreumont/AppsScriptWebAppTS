import type { Job } from "./JobInterface";


export interface UserInterface {
    ID: number;
    Prénom: string;
    Nom: string;
    Email: string;
    "Birth Year": Date;
    "Level of study": string;
    Job: Job;
    Age: number;
    Skills: string[];
}