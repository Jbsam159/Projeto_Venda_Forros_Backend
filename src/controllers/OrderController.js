import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import Product from "../models/Product.js"
import User from "../models/User.js"
import Cart from "../models/Cart.js"
import CartItem from "../models/CartItem.js"
import sequelize from "../db/database.js"

export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.userId;
    const { items } = req.body;

    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }],
      transaction
    });

    if (!cart || cart.CartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: "Carrinho vazio" });
    }

    const order = await Order.create(
      {
        userId,
        total: cart.CartItems.reduce(
          (sum, item) => sum + item.quantity * item.Product.price,
          0
        ),
        status: "Pendente"
      },
      { transaction }
    );

    for (const item of cart.CartItems) {
      const product = await Product.findByPk(item.productId, { transaction });

      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto: ${product.name}`);
      }

      await product.update(
        { stock: product.stock - item.quantity },
        { transaction }
      );
    }

    const orderItems = cart.CartItems.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.Product.price
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });

    await CartItem.destroy({ where: { cartId: cart.id }, transaction });

    await transaction.commit();

    res.status(201).json({ message: "Pedido criado com sucesso!", order });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { 
          model: OrderItem,
          include: [{ model: Product, attributes: ["id", "name", "price"] }]
        }
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};