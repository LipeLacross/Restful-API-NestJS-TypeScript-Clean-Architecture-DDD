# 🚀 RESTful API com NestJS, TypeScript e Clean Architecture

## 🌐🇧🇷 [Versão Portuguesa](README.md)
## 🌐🇺🇸 [English Version](README_EN.md)

## 📋 Sobre o Projeto

Um projeto prático para construir uma API RESTful usando Node.js, NestJS e TypeScript, aplicando **Clean Architecture**, **Domain-Driven Design (DDD)** e princípios **SOLID**, com testes automatizados.

> Este projeto é guiado pelo Professor **Jorge Aluizio Alves de Souza**, que traz insights especializados sobre arquitetura de software moderna e práticas de testes.

### 🎯 Características Principais

- ✅ Clean Architecture com camadas bem definidas
- ✅ Domain-Driven Design (DDD)
- ✅ Princípios SOLID
- ✅ Testes automatizados (unitários, integração e e2e)
- ✅ Prisma ORM para persistência
- ✅ Configuração multi-ambiente (development, test, production)
- ✅ Documentação da API com Swagger

### 🔨 Funcionalidades do Projeto

- **Cadastro de Usuários**: Criar novos usuários no sistema
- **Autenticação**: Login com JWT (JSON Web Token)
- **Listagem de Usuários**: Listar todos os usuários com paginação (15 itens por página)
- **Buscar Usuário**: Exibir dados de um usuário específico
- **Atualizar Usuário**: Atualizar nome de um usuário
- **Atualizar Senha**: Alterar senha do usuário
- **Excluir Usuário**: Remover usuário do sistema

### 📸 Documentação da API (Swagger)

![Swagger API Documentation](public/Screenshot%202026-03-15%20144236.png)

A documentação da API está disponível via Swagger em `/api` quando a aplicação estiver rodando.

### ✔️ Técnicas e Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem com tipagem estática
- **Prisma ORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação por token
- **bcryptjs** - Criptografia de senhas
- **Jest** - Framework de testes
- **Docker** - Containerização (opcional)

### 📊 Arquitetura do Projeto

```mermaid
graph TB
    subgraph Presentation
        A[Controllers] --> B[Use Cases]
    end
    
    subgraph Application
        B --> C[DTOs]
    end
    
    subgraph Domain
        C --> D[Entities]
        C --> E[Repositories Interfaces]
    end
    
    subgraph Infrastructure
        E --> F[Prisma Repository]
        F --> G[PostgreSQL]
    end
    
    B --> F
```

### 📁 Estrutura do Projeto

A estrutura do projeto segue os princípios do **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando o código em camadas bem definidas:

---

### 📂 Detalhamento da Estrutura

#### **Arquivos Raiz**
```
src/
├── app.module.ts              # Módulo raiz - registra e coordena todos os módulos da aplicação
├── main.ts                   # Ponto de entrada - configura e inicializa o servidor NestJS
├── global-config.ts          # Configurações globais (constantes, variáveis de ambiente)
├── app.controller.ts         # Controller raiz - rota GET / para verificação de saúde
├── app.service.ts           # Serviço raiz - lógica de negócio básica da raiz
```

#### **Módulo de Usuários (`users/`)**
```
users/
├── application/              # 📋 Camada de Aplicação - Casos de Uso
│   ├── dtos/
│   │   └── user-output.ts    # DTO de saída - define formato dos dados retornados ao cliente
│   └── usecases/
│       ├── signup.usecase.ts         # Cria novo usuário no sistema
│       ├── signin.usecase.ts         # Autentica usuário e retorna token JWT
│       ├── listusers.usecase.ts      # Lista usuários com paginação (15 por página)
│       ├── getuser.usecase.ts        # Busca usuário individual por ID
│       ├── update-user.usecase.ts    # Atualiza dados (nome) do usuário
│       ├── update-password.usecase.ts # Altera senha do usuário
│       └── delete-user.usecase.ts    # Remove usuário do sistema
│
├── domain/                   # 💼 Camada de Domínio - Regras de Negócio
│   ├── entities/
│   │   └── user.entity.ts   # Entidade Usuário - representa o objeto de negócio com validações
│   ├── repositories/
│   │   └── user.repository.ts  # Interface (contrato) - define operações do repositório
│   └── validators/
│       └── user.validator.ts   # Regras de validação específicas do domínio
│
└── infrastructure/           # ⚙️ Camada de Infraestrutura - Implementações
    ├── users.controller.ts   # Controlador REST - expõe endpoints da API
    ├── users.module.ts       # Módulo NestJS - injeta dependências do módulo
    ├── users.service.ts      # Serviço principal (legacy - usado com use cases)
    ├── presenters/
    │   └── user.presenter.ts # Presenter - transforma entidade para resposta da API
    ├── providers/hash-provider/
    │   └── bcryptjs-hash.provider.ts # Provider - implementação de hash de senha
    ├── dtos/
    │   ├── signup.dto.ts      # Validação dos dados de entrada para criação
    │   ├── signin.dto.ts      # Validação dos dados de entrada para login
    │   ├── list-users.dto.ts  # Parâmetros de paginação e filtros
    │   ├── update-user.dto.ts # Validação para atualização de dados
    │   └── update-password.dto.ts # Validação para alteração de senha
    └── database/
        ├── prisma/repositories/
        │   └── user-prisma.repository.ts # Implementação Prisma do repositório
        ├── prisma/models/
        │   └── user-model.mapper.ts      # Mapper - converte entidade ↔ modelo Prisma
        └── in-memory/repositories/
            └── user-in-memory.repository.ts # Repositório em memória para testes
```

#### **Módulo de Autenticação (`auth/`)**
```
auth/
└── infrastructure/
    ├── auth.module.ts    # Módulo de autenticação - configura JWT e estratégias
    ├── auth.service.ts   # Serviço - gera e valida tokens JWT
    └── auth.guard.ts     # Guard - protege rotas que requerem autenticação
```

#### **Módulo Compartilhado (`shared/`)**
```
shared/
├── application/              # Componentes compartilhados entre módulos
│   ├── usecases/
│   │   └── use-case.ts      # Interface base - padrão para todos os use cases
│   ├── errors/
│   │   ├── bad-request-error.ts       # Erro 400 - requisição inválida
│   │   ├── invalid-credentials-error.ts # Erro 401 - credenciais incorretas
│   │   └── invalid-password-error.ts  # Erro 400 - senha inválida
│   └── dtos/
│       └── pagination-output.ts      # DTO padrão de paginação
│
├── domain/                  # Componentes de domínio compartilhados
│   └── validators/
│       ├── validator-fields.interface.ts    # Interface de validador genérico
│       └── class-validator-fields.ts        # Implementação usando class-validator
│
└── infrastructure/          # Infraestrutura compartilhada
    ├── env-config/         # Configuração de variáveis de ambiente
    ├── database/prisma/     # Serviço Prisma e configurações de teste
    ├── presenters/         # Formatadores de resposta (paginação, coleção)
    ├── interceptors/       # Interceptadores HTTP (wrapper de resposta)
    └── exception-filters/  # Filtros de exceção (404, 401, 409, etc)
```

---

### 📖 Explicação das Camadas do Clean Architecture

| Camada | Responsabilidade | Dependências |
|--------|------------------|--------------|
| **Presentation** (`*/infrastructure`) | Recebe requisições HTTP, retorna respostas, valida dados de entrada | Não tem regras de negócio |
| **Application** (`*/application`) | Orquestra casos de uso, coordena entidades, aplica regras de negócio | Depende apenas do Domain |
| **Domain** (`*/domain`) | Contém regras de negócio puras, entidades, interfaces | Nenhuma dependência externa |
| **Infrastructure** (`*/infrastructure`) | Implementações externas: banco de dados, HTTP, cache, etc | Implementa interfaces do Domain |

### 🎯 Fluxo de Dados (Request → Response)

```
1. HTTP Request
      ↓
2. Controller (recebe requisição, valida DTO)
      ↓
3. Use Case (executa lógica de negócio)
      ↓
4. Entity (aplica regras de negócio)
      ↓
5. Repository Interface (contrato)
      ↓
6. Repository Implementation (Prisma)
      ↓
7. Banco de Dados (PostgreSQL)
      ↓
Retorno: Entity → Use Case → Presenter → Controller → HTTP Response
```

---

## 🛠️ Pré-requisitos

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
# "scripts": {
#   "test:e2e:watch": "npm run test:e2e -- --watch",
#   "test:e2e:cov": "npm run test:e2e -- --coverage",
#   "test:e2e:users": "npm run test:e2e -- test/e2e/users.e2e-spec.ts --watch",
#   "test:e2e:debug": "npm run test:e2e -- --detectOpenHandles --forceExit",
#   "test:all": "npm run test && npm run test:e2e",
#   "test:ci": "npm run test:e2e -- --runInBand --forceExit --coverage"
# }
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

## 🌐 Deploy

### Render.com

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente
3. Execute o comando de build: `npm run build`
4. Execute o comando de start: `npm run start:prod`

> O Render tem um PostgreSQL gratuito que expira em 90 dias.

### Fluxo de Trabalho com Git

```bash
# Criar nova funcionalidade
git checkout -b nova-funcionalidade

# Commit e push
git add .
git commit -m 'feat: nova funcionalidade'
git push origin nova-funcionalidade

# Criar Pull Request no GitHub
# Vá até o repositório e crie um novo Pull Request
# Compare as branches e faça o merge
```

## 🔧 Ferramentas de Integração Contínua

- **Jenkins**: Ferramenta de automação de código aberto
- **GitHub Actions**: Solução integrada com o GitHub
- **Circle CI**: Plataforma de CI/CD baseada em nuvem
- **AWS Code Build**: Serviço de CI da Amazon Web Services
- **Azure DevOps**: CI/CD no ambiente Microsoft Azure
- **Google Cloud Build**: Serviço de CI/CD do Google Cloud

## 📚 Documentação Adicional

### Livros Indicados

- **Arquitetura Limpa** - Robert C. Martin (O guia do artesão para estrutura e design de software)
- **Implementando Domain-Driven Design** - Vaughn Vernon (Prático, usa Java)
- **Atacando as complexidades no coração do software** - Eric Evans (Teórico, base do DDD)

### Links Úteis

- [Curso do Professor Jorge Aluizio](https://www.aluiziodeveloper.com.br/curso-de-nodejs-avan%C3%A7ado-com-clean-architecture-nestjs-e-typescript/)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design Vernon](https://vaughnvernon.com)
- [Martin Fowler](https://martinfowler.com)
- [Clean Code Blog](https://blog.cleancoder.com/uncle-bob/)
- [Swagger Editor](https://editor.swagger.io/)
- [Insomnia](https://insomnia.rest)

## 📚 Regras de Negócio

- Os campos name, email e password são obrigatórios
- O campo createdAt é preenchido automaticamente
- Não é permitido cadastrar usuário com e-mail duplicado
- A senha é criptografada com bcrypt
- Listagens são paginadas com 15 itens por página
- JWT encoded/decoded payload verify signature

## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

<p align="center">
  ⭐️ Projeto desenvolvido durante o curso do Professor Jorge Aluizio ⭐️
</p>

<p align="center">
  Desenvolvido por Felipe Moreira
</p>
