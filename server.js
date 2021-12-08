const express = require('express')
const { accountController, loginController } = require('./controllers')
const auth = require('./auth/auth')
require('dotenv').config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/account', auth, accountController.getByCpf)
app.post('/account', accountController.create)

app.put('/account/transfer', auth, accountController.transferAccount)
app.put('/account/deposit', auth, accountController.depositAccount)

app.post('/login', loginController.login)

app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`))
