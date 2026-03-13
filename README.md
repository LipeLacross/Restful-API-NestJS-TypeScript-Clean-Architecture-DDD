# 🚀 RESTful API com NestJS, TypeScript e Clean Architecture

## 📋 Sobre o Projeto

Um projeto prático para construir uma API RESTful usando Node.js, NestJS e TypeScript, aplicando **Clean Architecture**, **Domain-Driven Design (DDD)** e princípios **SOLID**, com testes automatizados.

> Este projeto é guiado pelo Professor **Jorge Aluizio Alves de Souza**, que traz insights especializados sobre arquitetura de software moderna e práticas de testes.

### 🎯 Características Principais

- ✅ Clean Architecture com camadas bem definidas
- ✅ Domain-Driven Design (DDD)
- ✅ Princípios SOLID
- ✅ Testes automatizados (unitários e e2e)
- ✅ Prisma ORM para persistência
- ✅ Configuração multi-ambiente (development, test, production)
- ✅ Documentação da API com Swagger (planejado)



## 🛠️ Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm ou yarn
- PostgreSQL (versão 14.x ou superior)
- Docker (opcional, para ambiente de desenvolvimento)

## 🚀 Começando

### 1️⃣ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/restful-api-nestjs-clean-architecture.git

# Entre no diretório
cd restful-api-nestjs-clean-architecture

# Instale as dependências
npm install

# Instale o NestJS CLI globalmente (opcional)
npm install -g @nestjs/cli
```

### 2️⃣ Configuração do Ambiente

```bash
# Crie os arquivos de ambiente baseados nos exemplos
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production

# Configure as variáveis de ambiente
# Edite os arquivos .env.* com suas configurações
```

### 3️⃣ Configuração do Banco de Dados com Prisma

```bash
# Inicialize o Prisma (já está configurado no projeto)
# Comentário: O schema.prisma já está em src/infra/database/prisma/schema.prisma

# Gere o cliente Prisma baseado no schema
npx prisma generate --schema=src/infra/database/prisma/schema.prisma

# Configure as variáveis de ambiente com dotenv-cli
# Comentário: Use dotenv-cli para gerenciar diferentes ambientes

# Configurar ambiente de desenvolvimento
npx dotenv-cli set NODE_ENV=development
npx dotenv-cli set DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs-clean-arch-dev?schema=public"

# Configurar ambiente de teste
npx dotenv-cli set NODE_ENV=test
npx dotenv-cli set DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs-clean-arch-test?schema=public"

# Configurar ambiente de produção
npx dotenv-cli set NODE_ENV=production
npx dotenv-cli set DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs-clean-arch-prod?schema=public"
```

### 4️⃣ Migrations do Banco de Dados

```bash
# Criar e aplicar migrations para desenvolvimento
# Comentário: O --create-only apenas cria a migration sem aplicar
npx dotenv-cli -e .env.development -- prisma migrate dev --schema=src/infra/database/prisma/schema.prisma

# Para criar apenas a migration (sem aplicar)
npx dotenv-cli -e .env.development -- prisma migrate dev --create-only --schema=src/infra/database/prisma/schema.prisma

# Aplicar migrations no ambiente de teste
npx dotenv-cli -e .env.test -- prisma migrate dev --schema=src/infra/database/prisma/schema.prisma

# Resetar banco de dados (cuidado: apaga todos os dados!)
npx dotenv-cli -e .env.development -- prisma migrate reset --schema=src/infra/database/prisma/schema.prisma

# Aplicar migrations em produção
npx dotenv-cli -e .env.production -- prisma migrate deploy --schema=src/infra/database/prisma/schema.prisma

# Visualizar dados com Prisma Studio
npx dotenv-cli -e .env.development -- prisma studio --schema=src/infra/database/prisma/schema.prisma
```

## 📚 Comandos NestJS CLI

### Módulos

```bash
# Criar módulo
nest g module modules/users
nest g module modules/auth --no-spec  # Comentário: --no-spec não gera arquivo de teste
```

### Controladores

```bash
# Criar controlador
nest g controller modules/users
nest g controller modules/users --flat   # Comentário: --flat cria arquivo direto na pasta
nest g controller modules/users --no-spec  # Comentário: Sem arquivo de teste
```

### Serviços

```bash
# Criar serviço
nest g service modules/users
nest g service modules/users --no-spec
```

### Recurso Completo (Recomendado)

```bash
# Gerar recurso completo (módulo, controlador, serviço, DTOs, entidades)
nest g resource modules/users
# Comentário: Este é o comando mais produtivo!
# Você poderá escolher entre: REST API, GraphQL, Microservice
# E entre gerar ou não os endpoints CRUD
```

### Classes e Interfaces

```bash
# Classes de domínio
nest g class core/entities/user-entity --no-spec
nest g class core/value-objects/email --no-spec

# Interfaces
nest g interface core/repositories/user-repository --no-spec
nest g interface modules/users/dto/user-response.interface --no-spec
```

### Guards (Autenticação/Autorização)

```bash
# Guards para proteção de rotas
nest g guard shared/guards/jwt-auth --no-spec
nest g guard shared/guards/roles --no-spec
nest g guard shared/guards/throttler --no-spec
```

### Interceptors

```bash
# Interceptors para transformar respostas
nest g interceptor shared/interceptors/logging --no-spec
nest g interceptor shared/interceptors/transform --no-spec
nest g interceptor shared/interceptors/cache --no-spec
```

### Pipes

```bash
# Pipes para validação e transformação
nest g pipe shared/pipes/validation --no-spec
nest g pipe shared/pipes/parse-uuid --no-spec
nest g pipe shared/pipes/trim-strings --no-spec
```

### Filters

```bash
# Filters para tratamento de exceções
nest g filter shared/filters/http-exception --no-spec
nest g filter shared/filters/prisma-exception --no-spec
nest g filter shared/filters/all-exceptions --no-spec
```

### Decorators

```bash
# Decorators customizados
nest g decorator shared/decorators/user --no-spec
nest g decorator shared/decorators/public --no-spec
nest g decorator shared/decorators/roles --no-spec
```

### Middleware

```bash
# Middleware para processamento de requisições
nest g middleware shared/middleware/logger --no-spec
nest g middleware shared/middleware/helmet --no-spec
nest g middleware shared/middleware/cors --no-spec
```

## 🧪 Testes

### Testes Unitários

```bash
# Rodar testes unitários
npm run test

# Rodar testes unitários com watch
npm run test:watch

# Rodar testes unitários com coverage
npm run test:cov

# Rodar testes unitários em modo debug
npm run test:debug
```

### Testes End-to-End (E2E)

```bash
# Comando base
npm run test:e2e

# Rodar um arquivo específico
npm run test:e2e -- test/e2e/users.e2e-spec.ts
npm run test:e2e -- test/e2e/auth.e2e-spec.ts

# Rodar por padrão de nome (regex)
# Comentário: O -t filtra por nome do teste
npm run test:e2e -- -t "users"
npm run test:e2e -- --testNamePattern "should create a user"

# Rodar em modo watch (observa mudanças)
npm run test:e2e -- --watch
npm run test:e2e -- --watchAll

# Rodar com detalhes
npm run test:e2e -- --verbose

# Rodar com timeout maior (30 segundos)
npm run test:e2e -- --testTimeout=30000

# Rodar um teste específico por descrição
npm run test:e2e -- -t "should return 201 when create user"

# Rodar com coverage
npm run test:e2e -- --coverage
npm run test:e2e -- --coverageDirectory=coverage-e2e

# Rodar em modo debug
npm run test:e2e -- --debug

# Detectar vazamentos de memória
npm run test:e2e -- --detectOpenHandles

# Forçar saída mesmo com erros
npm run test:e2e -- --forceExit

# Combinações úteis
npm run test:e2e -- --watch --verbose
npm run test:e2e -- test/e2e/users.e2e-spec.ts --verbose
npm run test:e2e -- -t "users" --watch
npm run test:e2e -- --detectOpenHandles --forceExit

# Rodar com configuração específica
# Comentário: Útil para CI/CD
npm run test:e2e -- --runInBand --forceExit --coverage
```

### Scripts de Teste Personalizados

```bash
# Adicione estes scripts ao seu package.json
: '
"scripts": {
  "test:e2e:watch": "npm run test:e2e -- --watch",
  "test:e2e:cov": "npm run test:e2e -- --coverage",
  "test:e2e:users": "npm run test:e2e -- test/e2e/users.e2e-spec.ts --watch",
  "test:e2e:debug": "npm run test:e2e -- --detectOpenHandles --forceExit",
  "test:all": "npm run test && npm run test:e2e",
  "test:ci": "npm run test:e2e -- --runInBand --forceExit --coverage"
}
'
```

## 📦 Scripts NPM Disponíveis

```bash
# Desenvolvimento
npm run start           # Inicia a aplicação
npm run start:dev       # Inicia em modo desenvolvimento com hot-reload
npm run start:debug     # Inicia em modo debug
npm run start:prod      # Inicia em modo produção

# Build
npm run build          # Compila a aplicação

# Lint e Formatação
npm run lint           # Executa ESLint
npm run format         # Formata código com Prettier

# Testes
npm run test           # Testes unitários
npm run test:watch     # Testes unitários com watch
npm run test:cov       # Testes com cobertura
npm run test:debug     # Testes em modo debug
npm run test:e2e       # Testes end-to-end
npm run test:int       # Testes de integração
```

## 🐳 Docker (Opcional)

```bash
# Subir PostgreSQL com Docker
docker run --name postgres-nest -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=nestjs-clean-arch-dev -p 5432:5432 -d postgres:14

# Docker Compose (se disponível)
docker-compose up -d
```

## 🌿 Padrões de Commit

Este projeto utiliza commits semânticos:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de build/dependências

## 📚 Documentação Adicional

- [Curso do Professor Jorge Aluizio](https://www.aluiziodeveloper.com.br/curso-de-nodejs-avan%C3%A7ado-com-clean-architecture-nestjs-e-typescript/)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request



---

<p align="center">
  ⭐️ Este projeto foi desenvolvido durante o curso do Professor Jorge Aluizio ⭐️
</p>
```


Curso de NodeJs Avançado com Clean Architecture, NestJS e Typescript
Projeto prático API Restful Nodejs, NestJS e Typescript, com testes automatizados, DDD, Clean Arch e Design Pattens.
O que você aprenderá?
Criar uma API REST em NodeJs com NestJS e Typescript
Aplicar Design Patterns em projetos NodeJs com Typescript
Criar testes automatizados em todas as camadas da aplicação
Usar recursos avançados do Typescript como Interface e Generics
Aplicar Clean Architecture e DDD em uma API criada com NestJS
Gerar documentação de API NestJS com Swagger
A﻿cesse agora a Pagina do Curso no portal Udemy.

Descrição do Curso
Criação de projeto prático direto ao ponto, exemplificando uma API Restful com Node.js, NestJS e Typescript, orientado à testes automatizados (unitários, de integração e ponta a ponta), aplicando conceitos de Domain Driven Design (DDD), Clean Architecture, Design Patterns e princípios SOLID.

Neste curso nao teremos explicação do zero sobre as tecnologias abordadas, o foco aqui é criar um projeto prático aplicando alguns conceitos do DDD, Clean Architecture e Testes Automatizados desde o inicio do projeto.

O objetivo deste curso é aprofundar na aplicação prática de todas essas tecnologias e metodologias citadas, seguindo as melhores práticas do mercado. Também serão abordados assuntos como princípios SOLID, design patterns e clean code.

O projeto desenvolvido no curso será composto por um módulo de usuários com: entidade, validação dos dados, repositórios, casos de usos, funcionalidades de um CRUD, paginação dos dados retornados em lista, autenticação com JWT, tudo desenvolvido acompanhado de testes automatizados, dentro de uma arquitetura baseada em conceitos de DDD e Clean Architecture.

O Framework NestJS ficará encarregado pelas funcionalidades da camada de infraestrutura. Serão inúmeros recursos do NestJS que usaremos para aumentar a produtividade, incluindo a criação de rotas, middlewares, controllers, interceptors, exception filters, guards, documentação, etc.

Com relação aos recursos para manipulação dos dados da aplicação, usaremos o Prisma, que é um ORM (Object Relational Mapper) de código aberto que simplifica drasticamente a modelagem de dados, migrações e acesso a dados em bancos de dados SQL e NoSql.

O curso inclui ainda:

Instruções de configuração de ambiente de desenvolvimento.
Projeto prático com um módulo de usuários.
Testes Automatizados: unitários, de integração e ponta a ponta.
Tratamento de erros e exceções.
Consultas avançadas com Prisma ORM.
Este curso é para você, se:

Você deseja implementar APIs Restful seguindo práticas do mercado.
Você gosta de aprender com a prática criando um projeto direto ao ponto.
Este curso não é para você, se:

Você é iniciante em programação.
Você nunca trabalhou com Javascript, Nodejs ou banco de dados relacional.
Tecnologias usadas e que precisarão estar instaladas no PC de cada aluno:

Node.js versao 18 ou superior.
Docker.
VS Code ou similar.
Insomnia ou similar.
CLI do NestJS.
CLI do Prisma ORM.
Regras de negócio (RN)
Os campos name, email e password serão de preenchimento obrigatório.
O campo createdAt será de preenchimento opcional.
O usuário não deve poder se cadastrar com e-mail duplicado.
Requisitos funcionais (RF)
Deve ser possível se cadastrar.
Deve ser possível se autenticar.
Deve ser possível exibir os dados de um usuário.
Deve ser possível listar todos os usuários.
Deve ser possível atualizar o nome de um usuário.
Deve ser possível atualizar a senha de um usuário.
Deve ser possível excluir um usuário.
Requisitos não-funcionais (RNF)
A senha do usuário precisa estar criptografada.
Os dados da aplicação precisam estar persistidos em um banco de dados Postgres.
Todas as listas de dados precisam estar paginadas com 15 itens por página.
O usuário deve ser identificado por um JWT (JSON Web Token).
Livros indicados como material de apoio
Arquitetura Limpa:

Titulo: O guia do artesao para estrutura e design de software
Autor: Robert C. Martin
Livro bem mais prático, abordando os conceitos de SOLID, arquitetura limpa, orientacao ao objeto, exemplos de como criar classes, etc.
Red book Domain-Driven Design:

Titulo: Implementando Domain-Driven Design
Autor: Vaughn Vernon
Usa a linguagem Java para mostrar na prática como aplicar o DDD em softwares, apesar de ter bastante teoria também.
Blue book Domain-Driven Design:

Titulo: Atacando as complexidades no coracao do software
Autor: Eric Evans
Esse livro é praticamente todo teorico, que aborda toda a metodologia de DDD que pode ser aplicada em um software. Não espere encontrar aqui projetos práticos ou exemplos completos em uma linguagem de programacao.
The Clean Code Blog:

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

https://vaughnvernon.com

https://martinfowler.com

http://cleancoder.com/products

O papel do arquiteto de software
Apesar de nem todas as organizações possuírem o cargo de arquiteto de software, normalmente profissionais mais experientes, como desenvolvedores seniors e tech leads, acabam realizando esse papel baseado em suas experiências anteriores.

O principal papel que essa pessoa pode assumir é a função de transformar requisitos de negócios em padrões arquitetônicos. Ou seja, ela vai pensar em como atender a alguns requisitos da empresa, os transformando em uma solução.

Esse arquiteto de software é um desenvolvedor e, em seu dia a dia, pode orquestrar o fluxo de comunicação entre pessoas desenvolvedoras e experts de domínio. A necessidade de ter um expert de domínio trabalhando junto com o desenvolvedor surge por existir, normalmente, uma dificuldade em alinhar o que vai ser desenvolvido com o que o cliente precisa.

Esse expert é uma pessoa que sabe da necessidade da organização, ou na maioria das vezes é a pessoa que vai utilizar o software no dia a dia.

Pilares da arquitetura de software
Organização: organizar um sistema para que possamos atender os objetivos de negócio gerando um produto para o cliente final.
Estruturação: criar um software de qualidade e que consiga evoluir com o passar do tempo.
Componentização: componentização dos processos para que eles operem com eficácia, evitando o retrabalho.
Relacionamento entre sistemas: preparar seus componentes para que esses consigam se integrar de maneira eficiente dentro de um processo maior.
Governança: A governança busca a garantia de que o software continue funcionando independente de equipe.
Clean Architecture, DDD e SOLID. Por quê?
As empresas estao usando essas metodologias que garantem softwares com estruturas robustas, com maiores facilidades para manutenções, custos menores, além de várias outras vantagens. O software precisa agregar valor ao negócio para que seja válida sua existencia.
