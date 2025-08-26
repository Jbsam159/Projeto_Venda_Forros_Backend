import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Cart from "./Cart.js";
import Product from "./Product.js";

const CartItem = sequelize.define("CartItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cartId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, { timestamps: false });

export default CartItem;