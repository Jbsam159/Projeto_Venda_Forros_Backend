import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Product = sequelize.define("Product", {

  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  imageUrl: {type: DataTypes.STRING, allowNull: true},
  stock: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}

}, {timestamps: true})

export default Product