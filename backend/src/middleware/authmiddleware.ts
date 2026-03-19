import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// Extending Express Request interface to include 'user'

export interface AuthRequest extends Request {
  user?: { id: number; email?: string };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token =
    typeof authHeader === "string" ? authHeader.split(" ")[1] : undefined;

  if (!authHeader || typeof authHeader !== "string") {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res
      .status(400)
      .json({ message: "Formato do token inválido. Use 'Bearer <token>'" });
    return;
  }

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    console.error("JWT_SECRET não definido no ambiente!");
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as {
      userId: number;
      email: string;
    };
    req.user = { id: payload.userId, email: payload.email }; // ✅ definido imediatamente
    next(); // chama o próximo middleware
  } catch (err) {
    console.warn("Token inválido ou expirado");
    res.status(403).json({ message: "Token inválido ou expirado" });
  }
};
