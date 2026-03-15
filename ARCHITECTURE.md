# Project Architecture

## 📁 Project Structure

```
restful-api-nestjs-clean-architecture/
├── src/
│   ├── app.module.ts                 # Main application module
│   ├── app.controller.ts             # Main controller
│   ├── app.service.ts                # Main service
│   ├── main.ts                       # Application entry point
│   ├── global-config.ts              # Global configuration
│   │
│   ├── users/                        # Users module (Clean Architecture)
│   │   ├── application/              # Application layer
│   │   │   ├── dtos/                # Data Transfer Objects
│   │   │   │   └── user-output.ts
│   │   │   └── usecases/            # Use cases
│   │   │       ├── signup.usecase.ts
│   │   │       ├── signin.usecase.ts
│   │   │       ├── getuser.usecase.ts
│   │   │       ├── listusers.usecase.ts
│   │   │       ├── update-user.usecase.ts
│   │   │       ├── update-password.usecase.ts
│   │   │       └── delete-user.usecase.ts
│   │   │
│   │   ├── domain/                  # Domain layer
│   │   │   ├── entities/            # Domain entities
│   │   │   │   └── user.entity.ts
│   │   │   ├── repositories/        # Repository interfaces
│   │   │   │   └── user-repository.interface.ts
│   │   │   └── validators/          # Domain validators
│   │   │
│   │   └── infrastructure/           # Infrastructure layer
│   │       ├── controllers/         # NestJS controllers
│   │       ├── dtos/                # NestJS DTOs
│   │       ├── database/            # Database implementation
│   │       │   └── prisma/
│   │       │       └── repositories/
│   │       │           └── user-prisma.repository.ts
│   │       ├── providers/           # External providers
│   │       │   └── hash-provider/
│   │       │       └── bcryptjs-hash.provider.ts
│   │       └── presenters/          # Response presenters
│   │
│   ├── auth/                        # Authentication module
│   │   └── infrastructure/
│   │       ├── auth.service.ts
│   │       ├── auth.guard.ts
│   │       └── auth.module.ts
│   │
│   └── shared/                      # Shared resources
│       ├── application/             # Shared application layer
│       │   ├── dtos/               # Shared DTOs
│       │   │   ├── pagination-output.ts
│       │   │   └── search-input.ts
│       │   ├── errors/             # Shared errors
│       │   │   ├── bad-request-error.ts
│       │   │   ├── invalid-credentials-error.ts
│       │   │   └── invalid-password-error.ts
│       │   ├── providers/          # Shared providers
│       │   │   └── hash-provider.interface.ts
│       │   └── usecases/           # Base use cases
│       │       └── use-case.ts
│       │
│       ├── domain/                  # Shared domain layer
│       │   ├── entities/            # Base entities
│       │   │   └── entity.ts
│       │   ├── errors/             # Base errors
│       │   │   ├── conflict-error.ts
│       │   │   ├── not-found-error.ts
│       │   │   └── validation-error.ts
│       │   ├── repositories/       # Base repository contracts
│       │   │   ├── repository-contracts.interface.ts
│       │   │   ├── searchable-repository-contracts.interface.ts
│       │   │   ├── in-memory.repository.ts
│       │   │   └── in-memory-searchable.repository.ts
│       │   └── validators/         # Base validators
│       │       └── class-validator-fields.ts
│       │
│       └── infrastructure/          # Shared infrastructure
│           ├── env-config/          # Environment configuration
│           ├── exception-filters/   # Exception filters
│           │   ├── conflict-error/
│           │   ├── invalid-credentials-error/
│           │   ├── invalid-password-error/
│           │   └── not-found-error/
│           └── interceptors/        # Interceptors
│               └── wrapper-data/
│                   └── pagination.presenter.ts
│                   └── collection.presenter.ts
│
├── test/                            # E2E tests
│   └── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── prisma/                          # Prisma configuration
│   └── schema.prisma
│
├── .github/                         # GitHub workflows
│   └── workflows/
│       ├── run-unit-tests.yml
│       └── run-int-e2e-tests.yml
│
├── config/                          # Configuration files
│
├── package.json
├── tsconfig.json
├── jest.config.ts
├── jest.unit.config.ts
├── jest.int.config.ts
├── jest.e2e.config.ts
├── docker-compose.yml
├── Dockerfile
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 🎯 Architecture Principles

### Clean Architecture Layers

The project follows Clean Architecture with three main layers:

1. **Domain Layer** (`domain/`)
   - Contains business entities and rules
   - Defines repository interfaces
   - No external dependencies
   - Pure TypeScript with no framework-specific code

2. **Application Layer** (`application/`)
   - Contains use cases (business logic)
   - Defines DTOs for data transfer
   - Depends only on the Domain layer
   - Orchestrates the flow of data

3. **Infrastructure Layer** (`infrastructure/`)
   - Implements repository interfaces
   - Contains controllers, DTOs, presenters
   - Handles external concerns (database, authentication)
   - Depends on Application and Domain layers

### Separation of Concerns

- **Modules**: Each feature (users, auth) is a separate module
- **Shared Resources**: Common utilities are in the `shared/` folder
- **Test Organization**: Tests are co-located with source files in `__tests__/` folders
- **Single Responsibility**: Each class/file has a single, well-defined purpose

### Scalability

- **Modular Structure**: New features can be added as new modules
- **Dependency Injection**: NestJS DI container manages dependencies
- **Repository Pattern**: Easy to switch database implementations
- **Provider Abstraction**: External services can be swapped without changing business logic

### Reusability

- **Base Classes**: Shared entities and repositories can be extended
- **Common DTOs**: Pagination and search DTOs are reusable
- **Exception Filters**: Centralized error handling
- **Interceptors**: Reusable request/response transformation

### Maintainability

- **Consistent Structure**: Each module follows the same pattern
- **TypeScript**: Strong typing reduces runtime errors
- **SOLID Principles**: Applied throughout the codebase
- **Tests**: Comprehensive test coverage ensures reliability

## 📝 Conventions

### File and Folder Naming

- **Files**: Use kebab-case (e.g., `user-repository.ts`)
- **Folders**: Use kebab-case (e.g., `hash-provider/`)
- **Tests**: Use naming pattern `{name}.spec.ts` (unit) or `{name}.e2e-spec.ts` (e2e)
- **Test Folders**: Use `__tests__/` with subfolders (`unit/`, `integration/`, `e2e/`)

### Coding Conventions

- **Classes**: PascalCase (e.g., `UserEntity`)
- **Interfaces**: PascalCase with optional `I` prefix (e.g., `UserRepository`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **DTOs**: PascalCase with suffix (e.g., `CreateUserDto`, `UserOutput`)
- **Use Cases**: PascalCase with suffix (e.g., `SignupUseCase`)

### Module Structure

Each feature module follows:

```
module-name/
├── application/
│   ├── dtos/
│   └── usecases/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── validators/
└── infrastructure/
    ├── controllers/
    ├── dtos/
    ├── database/
    ├── providers/
    └── presenters/
```

### Best Practices

- **Dependency Injection**: Inject dependencies via constructors
- **Async/Await**: Use async/await for asynchronous operations
- **Error Handling**: Use custom exception filters
- **Validation**: Use class-validator and class-transformer
- **Configuration**: Use environment variables for configuration

## 🛠️ Maintenance and Expansion

### Maintenance

#### Updating Dependencies

```bash
# Update all dependencies
npm update

# Update specific package
npm update package-name

# Check for outdated packages
npm outdated
```

#### Bug Fixes and Code Quality

1. Run tests before committing:
```bash
npm run test          # Unit tests
npm run test:int      # Integration tests
npm run test:e2e     # E2E tests
```

2. Run linting:
```bash
npm run lint
npm run format
```

3. Check coverage:
```bash
npm run test:cov
```

#### Code Quality Guidelines

- Keep functions small and focused
- Write meaningful variable and function names
- Add comments only when necessary
- Follow SOLID principles
- Write tests for new features

### Adding New Features

#### 1. Create a New Module

```bash
nest g resource modules/new-feature
```

#### 2. Set Up the Domain Layer

Create entities in `src/new-feature/domain/entities/`:

```typescript
// src/new-feature/domain/entities/new-feature.entity.ts
import { Entity } from '@shared/domain/entities/entity';

export class NewFeatureEntity extends Entity {
  // Add domain-specific properties and methods
}
```

Create repository interface in `src/new-feature/domain/repositories/`:

```typescript
// src/new-feature/domain/repositories/new-feature-repository.interface.ts
export interface NewFeatureRepository {
  // Define repository methods
}
```

#### 3. Create Use Cases

Add use cases in `src/new-feature/application/usecases/`:

```typescript
// src/new-feature/application/usecases/create-new-feature.usecase.ts
import { Injectable } from '@nestjs/common';
import { UseCase } from '@shared/application/usecases/use-case';

@Injectable()
export class CreateNewFeatureUseCase implements UseCase {
  async execute(input: CreateNewFeatureInput): Promise<CreateNewFeatureOutput> {
    // Implement use case logic
  }
}
```

#### 4. Implement Infrastructure

- Create controller in `src/new-feature/infrastructure/controllers/`
- Add DTOs in `src/new-feature/infrastructure/dtos/`
- Implement repository in `src/new-feature/infrastructure/database/`
- Register module in `src/new-feature/infrastructure/new-feature.module.ts`

#### 5. Add Tests

```bash
# Unit test
nest g test __tests__/unit new-feature

# Integration test
nest g test __tests__/integration new-feature

# E2E test
nest g test __tests__/e2e new-feature
```

#### 6. Update App Module

Import the new module in `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { NewFeatureModule } from './new-feature/infrastructure/new-feature.module';

@Module({
  imports: [NewFeatureModule],
  // ...
})
export class AppModule {}
```

---

**Last Update**: March 15, 2026

**Project Version**: 1.0.0

**Maintainer**: Felipe Moreira
