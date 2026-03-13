# Restful-API-NestJS-TypeScript-Clean-Architecture-DDD
A practical project to build a RESTful API using Node.js, NestJS, and TypeScript, applying Clean Architecture, Domain-Driven Design (DDD), SOLID principles, and automated tests. This course is guided by Professor Jorge Aluizio Alves de Souza, who brings expert insights into modern software architecture and testing practices.
comandos prrisma

npx prisma init
npx prisma generate --schema=src/infra/database/prisma/schema.prisma

uso do dotenv cli para escolher o ambiente
npx dotenv-cli set NODE_ENV=development
npx dotenv-cli set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nestjs-clean-architecture?schema=public

npx dotenv-cli -e .env.development -- prisma migrate dev --schema=src/infra/database/prisma/schema.prisma
npx dotenv-cli -e .env.test -- prisma migrate dev --schema=src/infra/database/prisma/schema.prisma
npx dotenv-cli -e .env.production -- prisma migrate dev --schema=src/infra/database/prisma/schema.prisma

comandos nest.js
# Módulos
nest g module users
nest g module users --no-spec  # sem arquivo de teste

# Controladores
nest g controller users
nest g controller users --flat   # sem criar pasta separada
nest g controller users --no-spec

# Serviços
nest g service users
nest g service users --no-spec

# Gerar tudo de uma vez (mais comum)
nest g resource users
# Isso gera: module, controller, service, entity, DTOs e mais!

🔧 Outros Geradores Úteis

# Classes
nest g class users/shared/user-entity
nest g interface users/shared/user.interface

# Guards (para autenticação/autorização)
nest g guard auth/guards/jwt

# Interceptors
nest g interceptor common/interceptors/logging

# Pipes
nest g pipe common/pipes/validation

# Filters (exception filters)
nest g filter common/filters/http-exception

# Decorators
nest g decorator common/decorators/user

# Middleware
nest g middleware common/middleware/logger


📝 Opções Comuns
bash
# Flags mais usadas:
--flat          # Não cria pasta adicional (arquivo direto na pasta)
--no-spec       # Não gera arquivo de teste
--dry-run       # Simula a geração sem criar arquivos

https://www.aluiziodeveloper.com.br/curso-de-nodejs-avan%C3%A7ado-com-clean-architecture-nestjs-e-typescript/
