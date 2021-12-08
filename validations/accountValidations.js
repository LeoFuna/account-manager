const statusCode = require('../helpers')
const { accountsModel } = require('../models')

const validators = {
  validateName: (name) => {
    if(!name || name === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Nome deve ser informado.' } }
    if(name.length < 6) return { code: statusCode.BAD_REQUEST, payload: { message: 'Nome deve ter no mínimo 6 caracteres.' } }
  },
  validateCpf: async (cpf, notSearchOnBd) => {
    if(!cpf || cpf === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf deve ser informado.' } }
    if(cpf.length !== 11) return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf inválido.' } }
    if (!notSearchOnBd) {
      const accountFound = await accountsModel.getByCpf(cpf)
      if(accountFound) return { code: statusCode.BAD_REQUEST, payload: { message: 'Cpf já possui conta cadastrada.' } }
    }
  },
  validatePassword: (password) => {
    if(!password || password === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ser informada.' } }
    if(password.length < 6) return { code: statusCode.BAD_REQUEST, payload: { message: 'Senha deve ter no mínimo 6 caracteres.' } }
  },
  validateTransaction: (value) => {
    if(value <= 0) return { code: statusCode.BAD_REQUEST, payload: { message: 'Transação deve ser maior do que Zero' } }
    if(!value || value === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Transação deve ser informada!' } }
  },
  validateDeposit: (deposit) => {
    if(deposit <= 0) return { code: statusCode.BAD_REQUEST, payload: { message: 'Despósito deve ser maior do que Zero' } }
    if(!deposit || deposit === '') return { code: statusCode.BAD_REQUEST, payload: { message: 'Depósito deve ser informado!' } }
    if(deposit > 2000) return { code: statusCode.BAD_REQUEST, payload: { message: 'São aceitos depósitos de até R$ 2.000,00!' } }
  }
}

module.exports = {
  validators
}