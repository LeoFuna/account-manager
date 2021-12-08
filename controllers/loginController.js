const { loginService } = require('../services')

const login = async (req, res) => {
  const { name, cpf } = req.body
  const loginResponse = await loginService.login(name, cpf)
  res.status(loginResponse.code).json(loginResponse.payload)
}

module.exports = {
  login
}