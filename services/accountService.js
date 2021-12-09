const { accountValidations } = require('../validations')
const statusCode = require('../helpers')
const { accountsModel } = require('../models')
const { validateCpf, validateName, validatePassword, validateTransaction, validateDeposit } = accountValidations.validators

const create = async (name, cpf, password) => {
  if(validateName(name)) return validateName(name)
  if(validatePassword(password)) return validatePassword(password)
  const isNotValidCpf = await validateCpf(cpf)
  if(isNotValidCpf) return isNotValidCpf
  const createResponse = await accountsModel.create(name, cpf, password)
  return { code: statusCode.CREATED, payload: createResponse }
}

const getByCpf = async (cpf) => {
  const accountInfo = await accountsModel.getByCpf(cpf)
  return { code: statusCode.OK, payload: accountInfo }
}

const transferAccount = async (userCpf, value, cpfToPay) => {
  if (await validateCpf(cpfToPay, true)) return await validateCpf(cpfToPay, true)
  if (validateTransaction(value)) return validateTransaction(value)
  const accountToPayFound = await accountsModel.getByCpf(cpfToPay)
  if(!accountToPayFound) return { code: statusCode.BAD_REQUEST, payload: { message: 'CPF inválido ou inexistente para transferência' } }
  if(accountToPayFound.cpf === userCpf) return { code: statusCode.BAD_REQUEST, payload: { message: 'Não é possível transferir para si mesmo.' } }
  const accountFound = await accountsModel.getByCpf(userCpf)
  if(accountFound.balance - value < 0) return { code: statusCode.BAD_REQUEST, payload: { message: 'Saldo insuficiente!' } }
  await accountsModel.updateBalance(cpfToPay, accountToPayFound.balance + value)
  const transferResponse = await accountsModel.updateBalance(userCpf, accountFound.balance - value)
  return { code: statusCode.OK, payload: transferResponse }
}

const depositAccount = async (cpf, value) => {
  if(validateDeposit(value)) return validateDeposit(value)
  const accountFound = await accountsModel.getByCpf(cpf)
  const depositResponse = await accountsModel.updateBalance(cpf, accountFound.balance + value)
  return { code: statusCode.OK, payload: depositResponse }
}

module.exports = {
  create,
  getByCpf,
  transferAccount,
  depositAccount
}