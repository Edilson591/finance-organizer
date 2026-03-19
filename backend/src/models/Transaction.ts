import { User } from "./User";
import { TransactionType } from "../utils/transaction-type.enum";


export interface Transaction {
  id?: number;
  userId: number;
  accountId: number;
  amount: number;
  description?: string | undefined;
  type : TransactionType;
  date?: string | null | undefined;
  User?: User[] | undefined;
  categoryId?: string |undefined;
  create_at?: Date | null;
  update_at?: Date | null;
}




