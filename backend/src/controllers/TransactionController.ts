import { Response } from "express";
import { AuthRequest } from "../middleware/authmiddleware";
import { TransactionService } from "../services/TransactionService";

class CreateTransactionController {
  async createTransaction(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const { accountId, amount, type, description } = req.body;

      const createTransactionService = new TransactionService();

      const transaction = await createTransactionService.createTransition({
        userId,
        accountId,
        amount,
        type,
        description,
      });

      res.status(201).json(transaction);
    } catch (error) {
      res
        .status(400)
        .json({ error: (error as Error)?.message ?? "Erro ao criar usuario" });
    }
  }

  async listTransaction(req: AuthRequest, res: Response) {
    try {
      const userId = req?.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const skip = (page - 1) * limit;

      const listTransactionService = new TransactionService();

      const count = listTransactionService.getCountRegisterTransaction(
        userId ?? 0,
      );

      const transiction = listTransactionService.listTransiction(
        userId ?? 0,
        skip,
        limit,
      );

      const [coountResponse, transictionResponse] = await Promise.all([
        count,
        transiction,
      ]);

      res.json({
        data: transictionResponse,
        meta: {
          page,
          limit,
          total: coountResponse,
          totalPages: Math.ceil(coountResponse / limit),
        },
      });
    } catch (error) {
      res.status(400).json({
        error: (error as Error).message ?? "Error ao busca Transação",
      });
    }
  }
}

export { CreateTransactionController };
