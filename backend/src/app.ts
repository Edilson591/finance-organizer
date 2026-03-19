import express from "express";
import cors from "cors";
import userRoutes from "./routes/routesUser";
import transationRoutes from "./routes/routesTransaction";
import accountRoutes from "./routes/routesAccount";
import { apiLimiter } from "./middleware/rateLimitMiddleware";


const app = express();

//setando o cors e o json
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", apiLimiter);
app.use("/", userRoutes);
app.use("/transactions", transationRoutes);
app.use("/accounts", accountRoutes);

const PORT = process.env.PORT || 3000;
// Importando as rotas

// rota incial
app.get("/", (req, res) => {
  res.send("Finance Organizer API");
});

// abertura do servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
