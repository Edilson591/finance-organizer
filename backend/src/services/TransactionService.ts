import prima from "../dataBase";
import { Transaction } from "../models/Transaction";

class TransactionService {
  async createTransition({
    userId,
    accountId,
    amount,
    type,
    description,
  }: Transaction) {
    try {
      const account = await prima.account.findUnique({
        where: { id: accountId },
      });

      if (!account || account.userId !== userId) {
        throw new Error("Conta não pertence ao usuário");
      }

      const newTransition = await prima.transaction.create({
        data: {
          userId,
          accountId,
          amount,
          type,
          description,
          updated_at: new Date(),
        },
      });

      const newBalance =
        type === "income" ? account.balance + amount : account.balance - amount;

      await prima.account.update({
        where: { id: accountId },
        data: { balance: newBalance },
      });

      return newTransition;
    } catch (error) {
      console.error("Error fetching account:", error);
      throw new Error("Could not fetch account");
    }
  }

  async listTransiction(userId: number, skip: number, limit: number) {
    return prima.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      skip,
      take: limit,
    });
  }

  async getCountRegisterTransaction(userId: number) {
    return prima.transaction.count({
      where: { userId },
    });
  }
}

export { TransactionService };
