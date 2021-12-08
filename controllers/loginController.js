const { loginService } = require('../services')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

const login = async (req, res) => {
  const { cpf, password } = req.body
  const loginResponse = await loginService.login(cpf, password)
  if (loginResponse.code > 250) {
    res.status(loginResponse.code).json(loginResponse.payload)
  } else {
    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ cpf, password }, secret, jwtConfig);
    res.status(loginResponse.code).json({ token });
  }
}

module.exports = {
  login
}