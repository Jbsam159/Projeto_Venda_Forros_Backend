import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Importa models e faz sync
import "./models/sync.js";

//importando Rotas
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"

import sequelize from "./db/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/products", productRoutes)

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