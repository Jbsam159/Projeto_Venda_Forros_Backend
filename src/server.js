import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Importa models e faz sync
import "./models/sync.js";

//importando Rotas
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

import sequelize from "./db/database.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/cart", cartRoutes)

app.get("/", (req, res) => {
  res.send("API Loja da Namorada Funcionando");
});

const PORT = process.env.PORT || 5000;

// Autentica o banco e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao MySQL com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor Rodando na Porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MySQL:', err);
  });