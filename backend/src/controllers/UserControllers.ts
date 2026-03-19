import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { EmailService } from "../services/EmailService";
import resetPasswordTemplate from "../templates/resetPasswordTemplate";

type AuthenticatedRequest = Request & {
  user?: {
    id?: number;
    email?: string;
  };
};

export class UserController {
  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const userServicer = new UserService();
      const user = await userServicer.getUserbyId(Number(id));

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const { password, ...userWithoutPassword } = user;

      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userService = new UserService();
      const user = await userService.getUserbyId(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const { password, ...userWithoutPassword } = user;
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Error fetching current user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUser(req: Request, res: Response): Promise<Response> {
    try {
      const listUser = new UserService();
      const userList = await listUser.getAllUser();
      if (!userList) {
        throw new Error("Usuário não encontrado");
      }

      const user = userList.map((row) => {
        const { password, ...userWithoutPassword } = row;
        return userWithoutPassword;
      });
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getEmailUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body as { email?: string };

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const userServices = new UserService();
      const user = await userServices.getUserForEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuário não encontrado" });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

      await userServices.updateUserSendEmail(user.email, code, codeExpires);

      const emailSend = new EmailService();

      const html = resetPasswordTemplate({
        name: user.username,
        code,
        link: `http://localhost:5173/reset-password?code=${code}`,
      });

      await emailSend.send(user.email, "Codigo de recuperacao de senha", html);

      return res.status(200).json({
        message: "Codigo enviado com sucesso",
      });
    } catch (error) {
      console.error("Error sending reset code:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { code, password } = req.body as {
        code?: string;
        password?: string;
      };

      if (!code || !password) {
        return res.status(400).json({ message: "Code and password are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must have at least 6 characters" });
      }

      const userService = new UserService();
      const updated = await userService.resetPasswordByCode(code, password);

      if (!updated) {
        return res.status(400).json({ message: "Codigo invalido ou expirado" });
      }

      return res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
