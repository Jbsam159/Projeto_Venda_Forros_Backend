import Product from "../models/Product.js"

// Função de criar um produto
export const createProduct = async (req, res) => {

  try {
    
    const {name, description, price} = req.body

    const product = await Product.create({name,description,price})
    res.status(201).json({message:"Produto Criado Com Sucesso", product})

  } catch (error) {
    
    res.status(400).json({ error: error.message });

  }

}

// Função para trazer todos os produtos
export const getAllProducts = async (req, res) => {

  try {
    
    const products = await Product.findAll()
    res.json({message: "Trazendo Todos Os Produtos",products})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

// Função de trazer produto pelo seu Id
export const getProductById = async (req, res) => {

  try {
    
    const id = req.params.id

    const product = await Product.findByPk(id)
    if(!product) return res.status(404).json({error: "Produto Não Encontrado!"})
    res.json({message: `Produto de ID ${id} encontrado`, product})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}