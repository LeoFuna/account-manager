/* eslint-disable no-undef */
const frisby = require('frisby')
const { MongoClient } = require('mongodb')

const mongoDbUrl = 'mongodb://localhost:27017/';
const url = 'http://localhost:3000';

describe('Valida a criação de contas', () => {
  let connection;
  let db;

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
  });

  afterEach(async () => {
    await db.collection('accounts').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é criada nova conta com dados válidos', async () => {
    await frisby
    .post(`${url}/account`, {
      name: 'Usuario Teste',
      cpf: '11111111111',
      password: '123456'
    })
    .expect('status', 201)
    .then((response) => {
      const { json } = response
      expect(json.name).toBe('Usuario Teste')
      expect(json.cpf).toBe('11111111111')
    })
  });

  it('Será validado que não é possível criar uma conta sem nome', async () => {
    await frisby
    .post(`${url}/account`, {
      cpf: '11111111111',
      password: '123456'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('Nome deve ser informado.')
    })
  })

  it('Será validado que não é possível criar conta sem cpf', async () => {
    await frisby
    .post(`${url}/account`, {
      name: 'Usuario Teste',
      password: '123456'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('Cpf deve ser informado.')
    })
  })

  it('Será validado que não é possível criar conta sem password', async () => {
    await frisby
    .post(`${url}/account`, {
      name: 'Usuario Teste',
      cpf: '11111111111'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('Senha deve ser informada.')
    })
  })
})