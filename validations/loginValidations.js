const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const validators = {
  validateName: (name) => {
    if(!name || name === '') return { code: statusCode.BAD_REQUEST, payload: 'Nome deve ser informado.' }
    if(name.length < 6) return { code: statusCode.BAD_REQUEST, payload: 'Nome deve ter no mínimo 6 caracteres.' }
  },
  validateCpf: (cpf) => {
    if(!cpf || cpf === '') return { code: statusCode.BAD_REQUEST, payload: 'Cpf deve ser informado.' }
    if(cpf.length !== 11) return { code: statusCode.BAD_REQUEST, payload: 'Cpf inválido.' }
  },
  validatePassword: async (password, cpf) => {
    if(!password || password === '') return { code: statusCode.BAD_REQUEST, payload: 'Senha deve ser informada.' }
    if(password.length < 6) return { code: statusCode.BAD_REQUEST, payload: 'Senha deve ter no mínimo 6 caracteres.' }
    const accountFound = await accountsModel.getByCpf(cpf)
    if(!accountFound || accountFound.password !== password) return { code: statusCode.BAD_REQUEST, payload: 'CPF não existente ou senha inválida' }
  }
}

module.exports = {
  validators
}