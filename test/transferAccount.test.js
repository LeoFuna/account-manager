/* eslint-disable no-undef */
const frisby = require('frisby')
const { MongoClient } = require('mongodb')

const mongoDbUrl = 'mongodb://localhost:27017/';
const url = 'http://localhost:3000';

describe('Valida depósito em conta', () => {
  let connection;
  let db;
  let results
  let token

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('acc_manage');
    await db.collection('accounts').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('accounts').deleteMany({});

    await frisby
    .post(`${url}/account`, {
      name: 'Usuario Teste',
      cpf: '11111111111',
      password: '123456'
    })
    .expect('status', 201)
    .then((response) => {
      const { json } = response
      results = { cpf: json.cpf, password: '123456' }
    })

    await frisby
    .post(`${url}/account`, {
      name: 'Usuario Teste 2',
      cpf: '22222222222',
      password: '123456'
    })
    .expect('status', 201)

    await frisby
    .post(`${url}/login`, results)
    .expect('status', 200)
    .then((response) => {
      const { json } = response
      token = json.token
    })
  });

  afterEach(async () => {
    await db.collection('accounts').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possível fazer uma transferência entre 2 contas existentes', async () => {
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: 100 })
    .expect('status', 200)

    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/transfer`, { value: 50, cpfToPay: '22222222222' })
    .expect('status', 200)
    .then((result) => {
      const { json } = result
      expect(json.cpf).toBe('11111111111')
      expect(json.balance).toBe(50)
    })

    await frisby
    .post(`${url}/login`, { cpf: '22222222222', password: '123456' })
    .expect('status', 200)
    .then((response) => {
      const { json } = response
      token = json.token
    })

    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .get(`${url}/account`)
    .expect('status', 200)
    .then((response) => {
      const { json } = response
      expect(json.cpf).toBe('22222222222')
      expect(json.balance).toBe(50)
    })
  })

  it('Será validado que não é possível fazer uma transferência ficando com saldo negativo', async () => {
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: 100 })
    .expect('status', 200)

    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/transfer`, { value: 101, cpfToPay: '22222222222' })
    .expect('status', 400)
    .then((result) => {
      const { json } = result
      expect(json.message).toBe('Saldo insuficiente!')
    })

    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .get(`${url}/account`)
    .expect('status', 200)
    .then((response) => {
      const { json } = response
      expect(json.cpf).toBe('11111111111')
      expect(json.balance).toBe(100)
    })
  })
})