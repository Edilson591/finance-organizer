import express, { Request, Response } from "express";
import { CreateTransactionController } from "../controllers/TransactionController";
import { verifyToken } from "../middleware/authmiddleware";

const transationRoutes = express.Router();

const transitionController = new CreateTransactionController();


transationRoutes.post(
  "/",
  verifyToken,
  (req: Request, res: Response) => {
    transitionController.createTransaction(req, res);
  },
);
transationRoutes.get(
  "/",
  verifyToken,
  (req: Request, res: Response) => {
    transitionController.listTransaction(req, res);
  },
);

export default transationRoutes;
