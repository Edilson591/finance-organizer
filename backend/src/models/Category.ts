import { User } from "../generated/prisma";
import { Transaction } from "./Transaction";


export interface Category {
    id: string;
    name: string;
    type: string;
    userId: number;
    user: User[] | undefined;
    transactions?: Transaction[] | undefined;
}