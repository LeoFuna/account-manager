const { accountService } = require('../services')
const getByCpf = async (_req, res) => {
  res.status(200).json({ messsage: 'Contas recebida' })
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