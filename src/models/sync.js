import sequelize from "../db/database.js";
import User from "./User.js";
import Product from "./Product.js";
import Order from "./Order.js"
import OrderItem from "./OrderItem.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";

// Sincroniza os modelos com o banco de dados
sequelize.sync({ alter: true })
  .then(() => console.log("Modelos User e Product sincronizados!"))
  .catch((err) => console.error("Erro ao sincronizar modelos:", err));

// Associações corretas:
Order.hasMany(OrderItem, { foreignKey: "orderId" }); // Um pedido tem muitos itens
OrderItem.belongsTo(Order, { foreignKey: "orderId" }); // Um item pertence a um pedido

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Cart.belongsTo(User, { foreignKey: "userId" });

CartItem.belongsTo(Cart, { foreignKey: "cartId" });
Cart.hasMany(CartItem, { foreignKey: "cartId" });

CartItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(CartItem, { foreignKey: "productId" });

export { User, Product, Order, OrderItem };