const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const validators = {
  validateName: (name) => {
    if(!name || name === '') return { code: statusCode.BAD_REQUEST, payload: 'Nome deve ser informado.' }
    if(name.length < 6) return { code: statusCode.BAD_REQUEST, payload: 'Nome deve ter no mínimo 6 caracteres.' }
  },
  validateCpf: async (cpf) => {
    if(!cpf || cpf === '') return { code: statusCode.BAD_REQUEST, payload: 'Cpf deve ser informado.' }
    if(cpf.length !== 11) return { code: statusCode.BAD_REQUEST, payload: 'Cpf inválido.' }
    const accountFound = await accountsModel.getByCpf(cpf)
    if(accountFound) return { code: statusCode.BAD_REQUEST, payload: 'Cpf já possui conta cadastrada.' }
  }
}

module.exports = {
  validators
}