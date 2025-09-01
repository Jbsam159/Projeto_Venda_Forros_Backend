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
// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Product ↔ OrderItem
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// User ↔ Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// User ↔ Cart
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Cart ↔ CartItem
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

// Product ↔ CartItem
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

export { User, Product, Order, OrderItem, Cart };