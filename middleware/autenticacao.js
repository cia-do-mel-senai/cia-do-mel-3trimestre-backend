import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}
