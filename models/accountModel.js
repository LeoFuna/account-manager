const connection = require('./connection')

const create = async (name, cpf, password) => {
  const db = await connection()
  const createResponse = await db.collection('accounts').insertOne({name, cpf, password, balance: 0})
  return {
    _id: createResponse.insertedId,
    name,
    cpf
  }
}

const getByCpf = async (cpf) => {
  const db = await connection()
  const accountFound = await db.collection('accounts').findOne({ cpf })
  return accountFound
}

const updateBalance = async (cpf, newBalance) => {
  const db = await connection()
  await db.collection('accounts').updateOne({ cpf }, { $set: { balance: newBalance } })
  return {
    cpf,
    balance: newBalance
  }
}

module.exports = {
  create,
  getByCpf,
  updateBalance
}