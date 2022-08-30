import { ICreateUserInputDto } from '@modules/accounts/dtos/ICreateUserDto';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(input: ICreateUserInputDto): Promise<void> {
    const user = new User(input.name, input.email, input.password, input.driver_license);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)!;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)!;
  }
}

export { UserRepositoryInMemory };
