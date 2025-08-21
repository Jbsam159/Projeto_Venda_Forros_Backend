// Importando User model
import User from "../models/User.js"

// Importando dependências
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Função de Registrar um usuário
export const register = async (req, res) => {

  try {
    
    const {name, email, password} = req.body

    // verificar se email já existe
    const emailExists = await User.findOne({where: {email}})
    if(emailExists){
      return res.status(400).json({error: "Email Já Cadastrado"})
    }

    // Hash da Senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criando usuário
    const user = await User.create({name, email, password: hashedPassword})

    res.status(201).json({message:"Usuário cadastrado com Sucesso!", user: {id: user.id, name: user.name, email: user.email }})

  } catch (error) {
    
    res.status(500).json({error: "Erro no registro: "+error.message})

  }

}

// Função de Login de um usuário
export const login = async (req, res) => {

  try {
    
    const {email, password} = req.body

    const user = await User.findOne({where: {email}})
    if (!user) return res.status(400).json({error: "Email ou Senha inválidos"})
    
    // Comparando senhas
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) return res.status(400).json({error: "Senha errada, digite novamente"})

    // Gerando Token JWT
    const token = jwt.sign({id:user.id, name: user.name, email: user.email}, process.env.JWT_SECRET,{expiresIn: "2h"})

    res.json({message: "Login realizado com sucesso!", token, user: { id: user.id, name: user.name, email: user.email }})

  } catch (error) {
    res.status(500).json({ error: "Erro no login: " + err.message });
  }

}