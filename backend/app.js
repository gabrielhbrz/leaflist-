import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

import authRoutes from "./src/routes/auth.routes.js";
import { autenticar } from "./src/middlewares/autenticar.js";
import tarefasRoutes from "./src/routes/tarefas.routes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://leaflist-production.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/auth", authRoutes);

app.use("/tarefas", autenticar, tarefasRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).json({ erro: err.message });
  }
  res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
