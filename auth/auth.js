const jwt = require('jsonwebtoken')
const statusCode = require('../helpers')
require('dotenv').config()

const secret = process.env.SECRET

const auth = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Faltando token de autenticação' })
  try {
    const { password, cpf } = jwt.verify(token, secret);
    const userInfo = { password, cpf };
    req.body = { ...req.body, userInfo };
    next()
  } catch (err) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token inválido' })
  }
};

module.exports = auth