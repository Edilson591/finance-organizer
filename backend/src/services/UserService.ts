import bcrypt from "bcrypt";
import { User } from "../generated/prisma";
import prima from "../dataBase";

class UserService {
  async getUserbyId(userId: number): Promise<User | null> {
    try {
      const user = await prima.user.findUnique({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Could not fetch user");
    }
  }

  async getAllUser(): Promise<User[] | null> {
    try {
      const user = await prima.user.findMany();
      return user;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Could not fetch users");
    }
  }

  async getUserForEmail(email: string): Promise<User | null> {
    try {
      const user = await prima.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      console.error("Erro ao buscar o usuario", error);
      return null;
    }
  }

  async updateUserSendEmail(
    email: string,
    resetCode: string,
    resetCodeExpires: Date
  ): Promise<User | null> {
    try {
      const userUpdate = await prima.user.update({
        where: { email },
        data: {
          resetCode,
          resetCodeExpires,
          updatedAt: new Date(),
        },
      });

      return userUpdate;
    } catch (error) {
      console.error("Erro ao enviar o codigo", error);
      return null;
    }
  }

  async getUserByResetCode(resetCode: string): Promise<User | null> {
    try {
      const user = await prima.user.findFirst({
        where: { resetCode },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuario pelo codigo", error);
      return null;
    }
  }

  async resetPasswordByCode(resetCode: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.getUserByResetCode(resetCode);

      if (!user || !user.resetCodeExpires || user.resetCodeExpires < new Date()) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prima.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetCode: null,
          resetCodeExpires: null,
          updatedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error("Erro ao redefinir senha", error);
      return false;
    }
  }
}

export { UserService };
