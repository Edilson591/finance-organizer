import bcrypt from "bcrypt";
import prima from "../dataBase";
import { User } from "../models/User";
import { Prisma } from "../generated/prisma";

class CreateUserService {
  async createUser({
    email,
    cpf,
    cnpj,
    username,
    password,
    roleName,
  }: Omit<User, "transactions" | "id" | "updatedAt">) {
    try {
      if (!email || !password) {
        throw new Error("Usuario não cadastrado");
      }
      const user = await prima.user.findUnique({
        where: { email: email },
      });

      if (user) {
        throw new Error("Usuário ja cadastrado");
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await prima.user.create({
        data: {
          email: email,
          username: username,
          cnpj: cnpj,
          cpf: cpf,
          password: hashPassword,
          roleName: roleName,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          username: true,
          email: true,
          roleName: true,
          cpf: true, // Garante retorno mesmo se for null
          cnpj: true, // Garante retorno mesmo se for null
          createdAt: true,
        },
      });
      // password is not present in newUser, so just return newUser
      return newUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Could not fetch user");
    }
  }
  async updateUserService(id: number, data: Prisma.UserUpdateInput) {
    try {
      if (!id) {
        throw new Error("Usuario não encontrado");
      }

      const { email, username, password, updatedAt } = data;

      let dataUpdate: Prisma.UserUpdateInput = {};

      if (email) dataUpdate.email = email;
      if (username) dataUpdate.username = username;
      if (password) {
        const plainPassword =
          typeof password === "string" ? password : password.set;
        if (!plainPassword) {
          throw new Error("Invalid password value");
        }
        const hashPassword = await bcrypt.hash(plainPassword, 10);
        dataUpdate.password = hashPassword;
      }

      updatedAt
        ? (dataUpdate.updatedAt = updatedAt)
        : (dataUpdate.updatedAt = new Date());

      const updateUser = await prima.user.update({
        where: {
          id: id,
        },
        data: dataUpdate,
      });

      if (!updateUser) {
        throw new Error("Usuario não encontrado");
      }
      const { password: rejectPassword, ...User } = updateUser;

      return User;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Could not update user");
    }
  }
}

export { CreateUserService };
