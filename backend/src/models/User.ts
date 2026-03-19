import { Transaction } from "./Transaction";

export enum Role {
  ADMIN,
  SUPPORT,
  ORGANIZATION,
  MANAGER,
  ADMINISTRATIVE,
  DIRECTOR,
  COORDINATOR,
  TEACHER,
  STUDENT,
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  roleName: number;
  cpf: string | null;
  cnpj: string | null;
  transactions?: Transaction[] | undefined;
  createdAt: Date;
  updatedAt: Date;
  resetCode?: string | null;
  resetCodeExpires?: Date | null;
}

export type UserLogin = Omit<User, "transactions">;

export type UserResponse = Omit<User, "password" | "transactions">;
