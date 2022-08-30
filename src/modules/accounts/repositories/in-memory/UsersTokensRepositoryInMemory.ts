import { ICreateUserTokenInputDto } from '@modules/accounts/dtos/ICreateUserTokenDto';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create(input: ICreateUserTokenInputDto): Promise<UserTokens> {
    const userToken = new UserTokens(
      input.refresh_token,
      input.user_id,
      input.expires_date,
    );

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.id === user_id && userToken.refresh_token === refresh_token,
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenToDelete = this.usersTokens.find((userToken) => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userTokenToDelete));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find((userToken) => userToken.refresh_token === refresh_token);
  }
}

export { UsersTokensRepositoryInMemory };
