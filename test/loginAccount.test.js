/* eslint-disable no-undef */
const frisby = require('frisby')
const { MongoClient } = require('mongodb')

const mongoDbUrl = 'mongodb://localhost:27017/';
const url = 'http://localhost:3000';

describe('Valida o login de contas', () => {
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

  it('Será validado que é possível fazer login em uma conta criada', async () => {
    let results

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
      expect(json.token === undefined).toBe(false)
    })
  })

  it('Será validado que não é possível fazer login sem possuir cadastro', async () => {

    await frisby
    .post(`${url}/login`, {
      cpf: '11111111111',
      password: '123456'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('CPF não existente ou senha inválida')
    })
  })

  it('Será validado que não é possível fazer login sem informar cpf', async () => {

    await frisby
    .post(`${url}/login`, {
      password: '123456'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('Cpf deve ser informado.')
    })
  })

  it('Será validado que não é possível fazer login sem informar senha', async () => {

    await frisby
    .post(`${url}/login`, {
      cpf: '11111111111'
    })
    .expect('status', 400)
    .then((response) => {
      const { json } = response
      expect(json.message).toBe('Senha deve ser informada.')
    })
  })
})