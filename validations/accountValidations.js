const validators = {
  validateName: (name) => {
    if(!name || name === '') return { message: 'Nome deve ser informado.' }
    if(name.length < 6) return { message: 'Nome deve ter no mínimo 6 caracteres.' }
  },
  validateCpf: (cpf) => {
    if(!cpf || cpf === '') return { message: 'Cpf deve ser informado.' }
    if(cpf.length !== 11) return { message: 'Cpf inválido.' }
  }
}

// const validateName = (name) => {
//   if(!name || name === '') return { message: 'Nome deve ser informado.' }
//   if(name.length < 6) return { message: 'Nome deve ter no mínimo 6 caracteres.' }
// }

module.exports = {
  validators
}