const { loginService } = require('../services')

const login = async (req, res) => {
  const { name, cpf, password } = req.body
  const loginResponse = await loginService.login(name, cpf, password)
  res.status(loginResponse.code).json(loginResponse.payload)
}

module.exports = {
  login
}