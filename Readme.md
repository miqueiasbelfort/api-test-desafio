## Desafio Técnico
* Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

### Tecnologias usadas
* Node
* Express
* Firebase
* Bcrypt
* JWT
* Vitest
* Supertes

### Rotas
* ``/`` Pegar todos os usuários que estão cadastrados (precisa passar o token);

        - "Header: { "Authorization": "Bearer {token}" }"

* ``/user`` Pegar o usuário pelo token passado;

        - "Header: { "Authorization": "Bearer {token}" }"

* ``/signup`` Fazer cadastro do usuário;

        - "nome: Lucas, email: lucas@json.com, senha: 123456, telefones: [{numero: 123456789, ddd: 11}]"

* ``/signin`` Fazer login do usuário;

        - "email: lucas@json.com, senha: 123456"
