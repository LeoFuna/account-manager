const { validators } = require('../validations/accountValidations')
const create = async (name, cpf) => {
  if(validators.validateName(name)) return validators.validateName(name)
  if(validators.validateCpf(cpf)) return validators.validateCpf(cpf)
  return { message: 'Conta criada' }
}

module.exports = {
  create
}