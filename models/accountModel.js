const connection = require('./connection')

const create = async (name, cpf) => {
  const db = await connection()
  const createResponse = await db.collection('accounts').insertOne({name, cpf})
  return {
    _id: createResponse._id,
    name,
    cpf
  }
}

const getByCpf = async (cpf) => {
  const db = await connection()
  const accountFound = await db.collection('accounts').findOne({ cpf })
  return accountFound
}

module.exports = {
  create,
  getByCpf
}