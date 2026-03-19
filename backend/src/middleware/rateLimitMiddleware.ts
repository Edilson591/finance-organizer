import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // máximo 100 requisições
  message: {
    message: "Muitas requisições, tente novamente em 1 minuto"
  },
  standardHeaders: true,
  legacyHeaders: false
});