import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {

  const userId = req.userId
  const {productId, quantity} = req.body

  try {
    
    let cart = await Cart.findOne({where : {userId}})
    if(!cart){
      cart = await Cart.create({userId})
    }

    // Verifica se já existe
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ cartId: cart.id, productId, quantity });
    }
    res.json(item);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

export const getCart = async (req, res) => {
  const userId = req.userId; // Pegue do JWT
  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.json({ items: [] });

    const items = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [Product]
    });

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {

  const userId = req.userId
  const {productId} = req.params

  try{
    
    let cart = await Cart.findOne({where: {userId}})

    if(!cart) return res.status(404).json({error:"Carrinho Não Encontrado"})

    const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ error: "Item não encontrado no carrinho" });

    await item.destroy();
    res.json({ message: "Item removido com sucesso" });

  }catch(error){

    res.status(500).json({ error: error.message });

  }

}

export const updateCartItem = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ error: "Item não encontrado" });

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};