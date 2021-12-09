# Boas vindas ao repositório do projeto Account Manager!

Olá seja bem vindo(a) ao meu projeto Account Manager, projeto é uma API de gerenciamento de contas desenvolvido em Node Js utilizando-se de JWT, Frisby, Jest e MongoDB.

---

# Sumário

- [Habilidades treinadas](#habilidades-treinadas)
- [Instruções para acessar o projeto](#instruções-para-acessar-o-projeto)


# Habilidades treinadas

- Arquitetura de Software.
- Criação de API com Node Js.
- Testes automatizados com Frisby e Jest.
- Manipulação de banco de dados não relacional (MongoDb)

---

## Instruções para acessar o projeto:

1. Clone o repositório
  * `git clone git@github.com:LeoFuna/account-manager.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd account-manager`

2. Instale as dependências:
  * `npm install`

3. Caso possua o mongoDb instalado, inicie o mesmo.
  * Caso não tenha instalado, instale-o.
    * [Página para Instalação](https://docs.mongodb.com/manual/installation/)

4. Inicie a aplicação:
  * `npm start`

5. Agora utilize alguma ferramenta para testar endpoints de APIs.
  * [Sugestão Insomnia](https://insomnia.rest/download)
  * Os endpoints disponíveis são:
    *  Cria uma nova conta: `/account [POST]`
    *  Faz login em conta: `/login [POST]`
    *  Realiza depósito em conta: `/account/deposit [PUT]` Obs: Necessita estar logado
    *  Realiza transferência entre contas: `/account/transfer [PUT]` Obs: Necessita estar logado
    *  Pega os dados de uma conta: `/account [GET]` Obs: Necessita estar logado

---

# Desafio de Backend



Seu **objetivo** é **criar uma API REST** com algumas **funções essenciais relacionadas** ao **gerenciamento de contas bancárias** em **uma** das linguagem: **Java, Kotlin, Python, Node.js, .NET**

- Para abrir uma conta é necessário apenas o nome completo e CPF da pessoa, mas só é permitido uma conta por pessoa;
- Com essa conta é possível realizar transferências para outras contas e depositar;
- Não aceitamos valores negativos nas contas;
- Por questão de segurança cada transação de depósito não pode ser maior do que R$2.000;
- As transferências entre contas são gratuitas e ilimitadas;

Em relação a **banco de dados**, **quem decide é você mesmo**.

Por favor, não esquecer de adicionar no README as instruções de como executar o projeto.

## O que avaliamos?

- Performance
- Testes
- Manutenabilidade
- Princípios de programação
- Arquitetura de Software

## Como entregar?

Não faça um fork desse projeto, crie um repositório no seu perfil do GitHub. Pode criar privado mesmo, sem problemas.
Assim que terminar é só compartilhar o código com nosso usuário [devdigitalrepublic](https://github.com/devdigitalrepublic) e entrar em contato com a gente.

Boa sorte e divirta-se! ;)
