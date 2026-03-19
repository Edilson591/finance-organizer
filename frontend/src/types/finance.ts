export type CategoryType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: CategoryType;
  categoryId: string;
  date: string;
  notes?: string;
  createdAt: string;
}
