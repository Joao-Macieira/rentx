import { ICreateUserInputDto } from '@modules/accounts/dtos/ICreateUserDto';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUserCase } from '../createUser/CreateUser.usercase';
import { AuthenticateUserUserCase } from './AuthenticateUser.usecase';

describe('AuthenticateUser usecase test', () => {
  let authenticateUserUseCase: AuthenticateUserUserCase;
  let createUserUseCase: CreateUserUserCase;
  let usersRepositoryInMemory: UserRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUserCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );

    createUserUseCase = new CreateUserUserCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserInputDto = {
      name: 'user',
      email: 'user@example.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate if user doesnt exists', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'test@test.com',
      password: '123456',
    })).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate if user password is incorrect', async () => {
    const user: ICreateUserInputDto = {
      name: 'user',
      email: 'user@example.com',
      password: '123456',
      driver_license: '000123',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '1234567',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
