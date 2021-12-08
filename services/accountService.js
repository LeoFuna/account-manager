const { accountValidations } = require('../validations')
const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const create = async (name, cpf, password) => {
  const { validateCpf, validateName, validatePassword } = accountValidations.validators
  if(validateName(name)) return validateName(name)
  if(validatePassword(password)) return validatePassword(password)
  const isValidCpf = await validateCpf(cpf)
  if(isValidCpf) return isValidCpf
  const createResponse = await accountsModel.create(name, cpf, password)
  return { code: statusCode.CREATED, payload: createResponse }
}

const getByCpf = async (cpf) => {
  const accountInfo = await accountsModel.getByCpf(cpf)
  return { code: statusCode.OK, payload: accountInfo }
}

module.exports = {
  create,
  getByCpf
}