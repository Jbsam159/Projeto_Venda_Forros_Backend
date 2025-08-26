import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import User from "./User.js";

const Cart = sequelize.define("Cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

export default Cart;