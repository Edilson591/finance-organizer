import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginService } from "../services/LoginService";

export class Login {
  async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as { email?: string; password?: string };

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const userServicer = new LoginService();
      const user = await userServicer.Login(email);

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
