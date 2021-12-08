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

const transferAccount = async (req, res) => {
  const { userInfo: { cpf }, cpfToPay, value } = req.body
  const transferResponse = await accountService.transferAccount(cpf, value, cpfToPay)
  res.status(transferResponse.code).json(transferResponse.payload)
}

const depositAccount = async (req, res) => {
  const { userInfo: { cpf }, value } = req.body
  const depositResponse = await accountService.depositAccount(cpf, value)
  res.status(depositResponse.code).json(depositResponse.payload)
}

module.exports = {
  getByCpf,
  create,
  transferAccount,
  depositAccount
}