const { validators } = require('../validations/accountValidations')
const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const create = async (name, cpf) => {
  if(validators.validateName(name)) return validators.validateName(name)
  const isValidCpf = await validators.validateCpf(cpf)
  if(isValidCpf) return isValidCpf
  const createResponse = await accountsModel.create(name, cpf)
  return { code: statusCode.CREATED, payload: createResponse }
}

module.exports = {
  create
}