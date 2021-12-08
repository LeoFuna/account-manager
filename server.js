const express = require('express')
const { accountController } = require('./controllers')
require('dotenv').config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/account', accountController.getByCpf)

app.listen(PORT, () => console.log(`Estou ouvindo a porta ${PORT}`))
