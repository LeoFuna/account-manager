const { loginValidations } = require('../validations')
const statusCode = require('../helpers')

const login = async (name, cpf) => {
  if(loginValidations.validators.validateName(name)) return loginValidations.validators.validateName(name)
  const isNotValidCpf = await loginValidations.validators.validateCpf(cpf)
  if(isNotValidCpf) return isNotValidCpf
  return { code: statusCode.CREATED, payload: { message: 'Login feito com sucesso' } }
}

module.exports = {
  login
}