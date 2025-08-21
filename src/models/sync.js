import sequelize from "../db/database.js";
import User from "./User.js";
import Product from "./Product.js";

// Sincroniza os modelos com o banco de dados
sequelize.sync({ alter: true })
  .then(() => console.log("Modelos User e Product sincronizados!"))
  .catch((err) => console.error("Erro ao sincronizar modelos:", err));

export { User, Product };