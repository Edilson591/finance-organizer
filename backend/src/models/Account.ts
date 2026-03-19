import { User } from "./User";

export interface Account {
  id?: number;
  name: string;
  type: "WALLET" | "BANK" | "CREDIT_CARD";
  userId: number;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}

export type AccountUpdateData = {
  name?: string;
  type?: "WALLET" | "BANK" | "CREDIT_CARD";
  balance?: number;
};
