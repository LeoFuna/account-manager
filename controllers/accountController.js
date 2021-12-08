const { accountService } = require('../services')
const getByCpf = async (req, res) => {
  const { userInfo } = req.body
  const getResponse = await accountService.getByCpf(userInfo.cpf)
  res.status(getResponse.code).json(getResponse.payload)
}

const create = async (req, res) => {
  const { name, cpf, password } = req.body
  const createAccountResponse = await accountService.create(name, cpf, password)
  res.status(createAccountResponse.code).json(createAccountResponse.payload)
}

module.exports = {
  getByCpf,
  create
}