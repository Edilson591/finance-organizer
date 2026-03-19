import express, { Request, Response } from "express";
import { AuthRequest, verifyToken } from "../middleware/authmiddleware";
import { AccountController } from "../controllers/AccountController";

const accountRoutes = express.Router();

const accountController = new AccountController();

accountRoutes.post("/", verifyToken, (req: AuthRequest, res: Response) => {
  accountController.createAccount(req, res);
});
accountRoutes.get("/", verifyToken, (req: AuthRequest, res: Response) => {
  accountController.createAccount(req, res);
});

export default accountRoutes;
