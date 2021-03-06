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

  it('Será validado que é possível fazer um depósito em conta estando logado', async () => { 
    //https://github.com/vlucas/frisby/issues/523
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: 100 })
    .expect('status', 200)
    .then((result) => {
      const { json } = result
      expect(json.cpf).toBe('11111111111')
      expect(json.balance).toBe(100)
    })
  })

  it('Será validado que não é possível fazer um depósito maior do que R$ 2.000,00', async () => {
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: 2001 })
    .expect('status', 400)
    .then((result) => {
      const { json } = result
      expect(json.message).toBe('São aceitos depósitos de até R$ 2.000,00!')
    })
  })

  it('Será validado que não é possível fazer depósitos de R$ 0 ou negativos', async () => {
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: 0 })
    .expect('status', 400)
    .then((result) => {
      const { json } = result
      expect(json.message).toBe('Depósito deve ser maior do que Zero')
    })

    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`, { value: -20 })
    .expect('status', 400)
    .then((result) => {
      const { json } = result
      expect(json.message).toBe('Depósito deve ser maior do que Zero')
    })
  })

  it('Será validado que não é possível fazer depósito sem valor definido', async () => {
    await frisby.setup({
      request: {
        headers: {
          authorization: token
        }
      }
    })
    .put(`${url}/account/deposit`)
    .expect('status', 400)
    .then((result) => {
      const { json } = result
      expect(json.message).toBe('Depósito deve ser informado!')
    })
  })
})