const connection = require('./connection')

const create = async (name, cpf, password) => {
  try {
    const db = await connection()
    const createResponse = await db.collection('accounts').insertOne({name, cpf, password, balance: 0})
    return {
      _id: createResponse.insertedId,
      name,
      cpf
    }
  } catch (e) {
    throw new Error
  }
}

const getByCpf = async (cpf) => {
  try {
    const db = await connection()
    const accountFound = await db.collection('accounts').findOne({ cpf })
    return accountFound
  } catch (e) {
    throw new Error
  }
}

const updateBalance = async (cpf, newBalance) => {
  try {
    const db = await connection()
    await db.collection('accounts').updateOne({ cpf }, { $set: { balance: newBalance } })
    return {
      cpf,
      balance: newBalance
    }
  } catch (e) {
    throw new Error
  }
}

module.exports = {
  create,
  getByCpf,
  updateBalance
}