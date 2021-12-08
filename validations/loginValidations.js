const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const validators = {
  validateCpf: (cpf) => {
    if(!cpf || cpf === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf deve ser informado.' } }
    if(cpf.length !== 11) return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf inválido.' } }
  },
  validatePassword: async (password, cpf) => {
    if(!password || password === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ser informada.' } }
    if(password.length < 6) return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ter no mínimo 6 caracteres.' } }
    const accountFound = await accountsModel.getByCpf(cpf)
    if(!accountFound || accountFound.password !== password) return { code: statusCode.BAD_REQUEST, payload: { message: 'CPF não existente ou senha inválida' } }
  }
}

module.exports = {
  validators
}