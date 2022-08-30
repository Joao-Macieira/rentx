import { ICreateUserTokenInputDto } from '../dtos/ICreateUserTokenDto';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

export interface IUsersTokensRepository {
  create(input: ICreateUserTokenInputDto): Promise<UserTokens>;
  findUserByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
