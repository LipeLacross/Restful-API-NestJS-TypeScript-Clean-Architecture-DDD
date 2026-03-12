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
npm install -g @nestjs/cli
nest new api-rest-nestjs
nest g module users
nest g controller users
nest g service users


https://www.aluiziodeveloper.com.br/curso-de-nodejs-avan%C3%A7ado-com-clean-architecture-nestjs-e-typescript/
