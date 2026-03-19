import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, CategoryType, Transaction } from "../types/finance";

type TransactionInput = Omit<Transaction, "id" | "createdAt">;
type CategoryInput = Omit<Category, "id" | "createdAt">;

interface FinanceState {
  categories: Category[];
  transactions: Transaction[];
  addCategory: (input: CategoryInput) => void;
  removeCategory: (id: string) => void;
  addTransaction: (input: TransactionInput) => void;
  removeTransaction: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;
  totals: {
    income: number;
    expense: number;
    balance: number;
  };
  totalsByCategory: Array<{
    categoryId: string;
    amount: number;
    type: CategoryType;
  }>;
  monthlySeries: Array<{ month: string; income: number; expense: number }>;
}

const defaultCategories: Category[] = [
  {
    id: "cat-salary",
    name: "Salario",
    type: "income",
    color: "#16a34a",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-food",
    name: "Alimentacao",
    type: "expense",
    color: "#ef4444",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-transport",
    name: "Transporte",
    type: "expense",
    color: "#f59e0b",
    createdAt: new Date().toISOString(),
  },
];

const defaultTransactions: Transaction[] = [
  {
    id: "trx-1",
    title: "Pagamento mensal",
    amount: 4500,
    type: "income",
    categoryId: "cat-salary",
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  },
  {
    id: "trx-2",
    title: "Mercado",
    amount: 420,
    type: "expense",
    categoryId: "cat-food",
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  },
];

function computeTotals(transactions: Transaction[]) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}

function computeTotalsByCategory(transactions: Transaction[]) {
  const map = new Map<string, { amount: number; type: CategoryType }>();

  transactions.forEach((transaction) => {
    const current = map.get(transaction.categoryId);

    map.set(transaction.categoryId, {
      amount: (current?.amount ?? 0) + transaction.amount,
      type: transaction.type,
    });
  });

  return Array.from(map.entries()).map(([categoryId, value]) => ({
    categoryId,
    amount: value.amount,
    type: value.type,
  }));
}

function computeMonthlySeries(transactions: Transaction[]) {
  const months = new Map<string, { income: number; expense: number }>();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const current = months.get(key) ?? { income: 0, expense: 0 };

    if (transaction.type === "income") {
      current.income += transaction.amount;
    } else {
      current.expense += transaction.amount;
    }

    months.set(key, current);
  });

  return Array.from(months.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }));
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => {
      // função auxiliar para recalcular tudo
      const recalc = (transactions: Transaction[]) => ({
        transactions,
        totals: computeTotals(transactions),
        totalsByCategory: computeTotalsByCategory(transactions),
        monthlySeries: computeMonthlySeries(transactions),
      });

      return {
        categories: defaultCategories,

        // 🔥 estado inicial já calculado
        ...recalc(defaultTransactions),

        addCategory: (input) => {
          const newCategory: Category = {
            ...input,
            id: `cat-${crypto.randomUUID()}`,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            categories: [newCategory, ...state.categories],
          }));
        },

        removeCategory: (id) => {
          set((state) => {
            const updatedTransactions = state.transactions.filter(
              (transaction) => transaction.categoryId !== id,
            );

            return {
              categories: state.categories.filter(
                (category) => category.id !== id,
              ),
              ...recalc(updatedTransactions),
            };
          });
        },

        addTransaction: (input) => {
          const newTransaction: Transaction = {
            ...input,
            id: `trx-${crypto.randomUUID()}`,
            createdAt: new Date().toISOString(),
          };

          set((state) => {
            const updatedTransactions = [newTransaction, ...state.transactions];

            return recalc(updatedTransactions);
          });
        },

        removeTransaction: (id) => {
          set((state) => {
            const updatedTransactions = state.transactions.filter(
              (transaction) => transaction.id !== id,
            );

            return recalc(updatedTransactions);
          });
        },

        getCategoryById: (id) =>
          get().categories.find((category) => category.id === id),
      };
    },
    {
      name: "finance-organizer-store",
      partialize: (state) => ({
        categories: state.categories,
        transactions: state.transactions,
      }),
    },
  ),
);
