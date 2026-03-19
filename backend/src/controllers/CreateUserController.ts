import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async createUser(req: Request, res: Response) {
    const { email, password, cpf, cnpj, username, roleName } = req.body as {
      email?: string;
      password?: string;
      cpf?: string | null;
      cnpj?: string | null;
      username?: string;
      roleName?: number;
    };

    try {
      if (!email || !password || !username) {
        return res.status(400).json({ message: "Email, username and password are required" });
      }

      const createUsers = new CreateUserService();

      const newUser = await createUsers.createUser({
        email,
        password,
        cpf: cpf ?? null,
        cnpj: cnpj ?? null,
        username,
        roleName: roleName ?? 8,
        createdAt: new Date(),
      });

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return res.status(201).send({
        message: "User created",
        token,
        user: newUser,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message || "Erro ao criar usuario" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id, email, username, password, updatedAt } = req.body as {
      id?: string | number;
      email?: string;
      username?: string;
      password?: string;
      updatedAt?: Date;
    };

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const dataUpdate: Prisma.UserUpdateInput = {};

    if (email !== null && email !== undefined) {
      dataUpdate.email = email;
    }

    if (username !== null && username !== undefined) {
      dataUpdate.username = username;
    }

    if (password !== null && password !== undefined) {
      dataUpdate.password = password;
    }

    if (updatedAt !== null && updatedAt !== undefined) {
      dataUpdate.updatedAt = updatedAt;
    }

    const user = new CreateUserService();
    const updateUser = await user.updateUserService(Number(id), dataUpdate);

    return res.status(200).send({ user: updateUser });
  }
}

export { CreateUserController };
