import { AuthRequest } from "../middleware/authmiddleware";
import { Account } from "../models/Account";
import { AccountServices } from "../services/AccountServices";
import { Request, Response } from "express";

export class AccountController {
  async createAccount(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id; 
      const { name, type, balance } = req.body;


      if(!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      // Validação simples
      if (!name || !type || balance === undefined) {
        return res.status(400).json({ message: "Dados inválidos" });
      }

      const accountService = new AccountServices();

      // Cria a conta
      const newAccount: Account | null =
        await accountService.createAccount({
          name,
          type,
          balance,
          userId,
        });

      // Retorna resposta
      return res.status(201).json(newAccount);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
