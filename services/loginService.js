const { loginValidations } = require('../validations')
const statusCode = require('../helpers')

const login = async (cpf, password) => {
  const { validateCpf, validatePassword } = loginValidations.validators
  if(validateCpf(cpf)) return validateCpf(cpf)
  const isNotValidEntries = await validatePassword(password, cpf)
  if(isNotValidEntries) return isNotValidEntries
  return { code: statusCode.OK, payload: { message: 'Login feito com sucesso' } }
}

module.exports = {
  login
}