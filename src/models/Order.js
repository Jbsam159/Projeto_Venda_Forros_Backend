import { DataTypes } from "sequelize";
import sequelize from "../db/database.js"
import User from "../models/User.js"

const Order = sequelize.define("Order", {

  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  userId: {type: DataTypes.INTEGER, allowNull: false},
  status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Pendente"},
  total: {type: DataTypes.DECIMAL(10,2), allowNull: false, default: 0.00},
  createdAt: DataTypes.DATE,

},{timestamps: true})


export default Order