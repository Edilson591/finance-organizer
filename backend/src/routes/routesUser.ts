import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserControllers";
import { verifyToken } from "../middleware/authmiddleware";
import { CreateUserController } from "../controllers/CreateUserController";
import { Login } from "../controllers/LoginController";

const userRoutes = express.Router();
const userController = new UserController();
const loginController = new Login();
const createUser = new CreateUserController();

// Auth routes for frontend integration
userRoutes.post("/auth/login", (req: Request, res: Response) => {
  loginController.loginUser(req, res);
});

userRoutes.post("/auth/register", (req: Request, res: Response) => {
  createUser.createUser(req, res);
});

userRoutes.post("/auth/forgot-password", (req: Request, res: Response) => {
  userController.getEmailUser(req, res);
});

userRoutes.post("/auth/reset-password", (req: Request, res: Response) => {
  userController.resetPassword(req, res);
});

userRoutes.get("/auth/me", verifyToken, (req: Request, res: Response) => {
  userController.getCurrentUser(req, res);
});

// Backward compatible routes
userRoutes.post("/login", (req: Request, res: Response) => {
  loginController.loginUser(req, res);
});

userRoutes.post("/register", (req: Request, res: Response) => {
  createUser.createUser(req, res);
});

userRoutes.post("/forgot-password", (req: Request, res: Response) => {
  userController.getEmailUser(req, res);
});

userRoutes.put("/update", verifyToken, (req: Request, res: Response) => {
  createUser.updateUser(req, res);
});

userRoutes.get("/users", verifyToken, (req: Request, res: Response) => {
  userController.getAllUser(req, res);
});

userRoutes.get("/users/:id", verifyToken, (req: Request, res: Response) => {
  userController.getUser(req, res);
});

export default userRoutes;
