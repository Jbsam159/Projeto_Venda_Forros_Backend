import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Order from "./Order.js";
import Product from "./Product.js";

const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false }, // FK para Order
  productId: { type: DataTypes.INTEGER, allowNull: false }, // FK para Product
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, { timestamps: false });

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export default OrderItem;