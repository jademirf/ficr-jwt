const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

// rota para validar a API
app.get('/api', (req, res) => {
  res.send('API Funcionando!!')
})

// rota simulando o login do usuário
app.post('/api/login', (req, res) => {
  const {usuario} = req.body
  const payload = {
    usuario,
    perfil: 'Administrador',
    setor: 'TIC'
  }
  jwt.sign(payload, 'senhaSuperSecretaESegura', (err, token)=>{
    if(err){
      res.sendStatus(400)
    }
    res.json({token})
  })
})

// rota para mostrar como funciona o payload
app.get('/api/decode', (req, res) => {
  const token = req.headers.authorization
  const payload = jwt.verify(token, 'senhaSuperSecretaESegura')
  res.json({
    message: 'Usuário validado',
    payload
  })
})

// app.method(rota, validacaoAcesso, controller)
app.get('/api/users', (req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, 'senhaSuperSecretaESegura', (err, data) => {
    if (err) {
      res.sendStatus(401)
    }
    next()
  })
}, (req, res) => {
  const users = [
    {
      name: 'Fulano',
      idade: 20
    },
    {
      name: 'Cicrano',
      idade: 30
    },
    {
      name: 'Beltrano',
      idade: 40
    }
  ]
  res.json(users)
})

// iniciando o servidor na porta 5000
app.listen(5000, () => {
  console.log('Api funcionando na porta 5000')
})