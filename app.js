const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.get('/api', (req, res) => {
  res.send('Bem vindo à API JWT!')
})

app.post('/api/login', (req, res) => {
  const {usuario} = req.body
  jwt.sign({usuario, perfil: 'administrador', setor: 'contabilidade'}, 'senhaSuperSecreta', (err, token) => {
    res.json(token)
  })
})

app.get('/api/decode', (req, res)=>{
  const token = req.headers.authorization
  const payload = jwt.verify(token, 'senhaSuperSecreta')
  res.json({
    message: 'usuário validado',
    payload
  })
})

app.get('/api/users',(req, res, next)=>{
  const token = req.headers.authorization
  jwt.verify(token, 'senhaSuperSecreta', (err, data)=>{
    if(err) {
      res.sendStatus(401)
    }
    next()
  })
},(req, res)=>{
  const users = [
    {
      name: 'Fulano'
    },
    {
      name: 'Cicrano'
    },
    {
      name: 'Beltrano'
    }
  ]
  res.send(users)
})

app.listen(5000, function () {
  console.log('Api funcionando na porta 5000')
})