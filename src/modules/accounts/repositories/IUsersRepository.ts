import { ICreateUserInputDto } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(input: ICreateUserInputDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
