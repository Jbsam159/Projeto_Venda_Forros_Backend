import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não encontrado." });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // agora disponível em qualquer rota protegida!
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};