const statusCode = require('../helpers')
const { accountService } = require('../services')
const getByCpf = async (req, res) => {
  const { userInfo } = req.body
  try {
    const getResponse = await accountService.getByCpf(userInfo.cpf)
    res.status(getResponse.code).json(getResponse.payload)
  } catch (e) {
    res.status(statusCode.INTERNAL_ERROR).json({ message: 'Erro inesperado, favor tentar novamente' })
  }
}

const create = async (req, res) => {
  const { name, cpf, password } = req.body
  try {
    const createAccountResponse = await accountService.create(name, cpf, password)
    res.status(createAccountResponse.code).json(createAccountResponse.payload)
  } catch (e) {
    res.status(statusCode.INTERNAL_ERROR).json({ message: 'Erro inesperado, favor tentar novamente' })
  }
}

const transferAccount = async (req, res) => {
  const { userInfo: { cpf }, cpfToPay, value } = req.body
  try {
    const transferResponse = await accountService.transferAccount(cpf, value, cpfToPay)
    res.status(transferResponse.code).json(transferResponse.payload)
  } catch (e) {
    res.status(statusCode.INTERNAL_ERROR).json({ message: 'Erro inesperado, favor tentar novamente' })
  }
}

const depositAccount = async (req, res) => {
  const { userInfo: { cpf }, value } = req.body
  try {
    const depositResponse = await accountService.depositAccount(cpf, value)
    res.status(depositResponse.code).json(depositResponse.payload)
  } catch (e) {
    res.status(statusCode.INTERNAL_ERROR).json({ message: 'Erro inesperado, favor tentar novamente' })
  }
}

module.exports = {
  getByCpf,
  create,
  transferAccount,
  depositAccount
}