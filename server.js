const express = require('express')
const { accountController, loginController } = require('./controllers')
require('dotenv').config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/account', accountController.getByCpf)
app.post('/account', accountController.create)
app.post('/login', loginController.login)

app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`))
