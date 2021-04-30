## Exemplo de uso do JWT

### Configuração inicial:
Após clonar o projeto, executar o comando: 
``` shell 
npm install
```

Em seguida executar o comando:
```shell
npm run dev
```

### Uso:

Após iniciar o sistema usar as rotas:

* POST 'localhost:5000/api/login'

>>  body:
  ```json
    {
      "usuario": "loginDoUsuario",
      "senha": "senhaDoUsuario"
    }
  ```

* GET 'localhost:5000/api/decode'

* GET 'localhost:5000/api/users'