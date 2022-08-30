import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserInputDto } from '@modules/accounts/dtos/ICreateUserDto';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUserCase {
  private userRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.userRepository = usersRepository;
  }

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserInputDto): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 10);

    await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUserCase };
