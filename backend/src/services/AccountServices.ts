import prisma from "../dataBase";
import { Account, AccountUpdateData } from "../models/Account";

class AccountServices {
  // Criar nova conta
  async createAccount(data: Account): Promise<Account | null> {
    try {
      const account = await prisma.account.create({
        data: {
          name: data.name,
          type: data.type,
          userId: data.userId,
          balance: data.balance ?? 0,
        },
      });

      return account;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw new Error("Não foi possível criar a conta");
    }
  }

  // Buscar todas as contas de um usuário
  async getAccountsByUser(userId: number): Promise<Account[]> {
    try {
      const accounts = await prisma.account.findMany({
        where: { userId },
      });

      return accounts;
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      throw new Error("Não foi possível buscar as contas");
    }
  }

  // Buscar uma conta por ID
  async getAccountById(id: number): Promise<Account | null> {
    try {
      const account = await prisma.account.findUnique({
        where: { id },
      });

      return account;
    } catch (error) {
      console.error("Erro ao buscar conta:", error);
      throw new Error("Não foi possível buscar a conta");
    }
  }

  // Atualizar saldo ou nome de uma conta
  async updateAccount(id: number, data: AccountUpdateData): Promise<Account> {
    try {
      const account = await prisma.account.update({
        where: { id },
        data: data,
      });

      return account;
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      throw new Error("Não foi possível atualizar a conta");
    }
  }

  // Deletar conta
  async deleteAccount(id: number): Promise<Account> {
    try {
      const account = await prisma.account.delete({
        where: { id },
      });

      return account;
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      throw new Error("Não foi possível deletar a conta");
    }
  }
}

export { AccountServices };
