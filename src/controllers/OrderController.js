import Order from "../models/Order.js"
import OrderItem from "../models/OrderItem.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export const createOrder = async (req, res) => {

  try {
    
    const {userId, items} = req.body

    const order = await Order.create({userId, status: "Pendente"})

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) continue;
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    res.status(201).json({ message: "Pedido criado!", orderId: order.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

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