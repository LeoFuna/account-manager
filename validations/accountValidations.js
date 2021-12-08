const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const validators = {
  validateName: (name) => {
    if(!name || name === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Nome deve ser informado.' } }
    if(name.length < 6) return { code: statusCode.BAD_REQUEST, payload: { message: 'Nome deve ter no mínimo 6 caracteres.' } }
  },
  validateCpf: async (cpf) => {
    if(!cpf || cpf === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf deve ser informado.' } }
    if(cpf.length !== 11) return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf inválido.' } }
    const accountFound = await accountsModel.getByCpf(cpf)
    if(accountFound) return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf já possui conta cadastrada.' } }
  },
  validatePassword: (password) => {
    if(!password || password === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ser informada.' } }
    if(password.length < 6) return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ter no mínimo 6 caracteres.' } }
  }
}

module.exports = {
  validators
}