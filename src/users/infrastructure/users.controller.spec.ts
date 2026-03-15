import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthService } from '@/auth/infrastructure/auth.service'
import { AuthGuard } from '@/auth/infrastructure/auth.guard'
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service'
import { SignupUseCase } from '../application/usecases/signup.usecase'
import { SigninUseCase } from '../application/usecases/signin.usecase'
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase'
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase'
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase'
import { GetUserUseCase } from '../application/usecases/getuser.usecase'
import { ListUsersUseCase } from '../application/usecases/listusers.usecase'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: AuthService,
          useValue: {
            generateJwt: jest.fn().mockResolvedValue({ accessToken: 'token' }),
            verifyJwt: jest.fn().mockResolvedValue({ id: 'user-id' }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
            verifyAsync: jest.fn().mockResolvedValue({ id: 'user-id' }),
          },
        },
        {
          provide: EnvConfigService,
          useValue: {
            getJwtSecret: jest.fn().mockReturnValue('test-secret'),
            getJwtExpiresInSeconds: jest.fn().mockReturnValue(86400),
          },
        },
        AuthGuard,
        {
          provide: SignupUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: SigninUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdatePasswordUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetUserUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListUsersUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
