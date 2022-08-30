import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  private usersTokensRepository: IUsersTokensRepository;

  private dayjsDateProvider: IDateProvider;

  constructor(
    @inject('UsersTokensRepository') usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') dayjsDateProvider: IDateProvider,
  ) {
    this.usersTokensRepository = usersTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

    const user_id = sub;

    const usersToken = await this.usersTokensRepository.findUserByIdAndRefreshToken(
      user_id,
      token,
    );

    if (!usersToken) {
      throw new AppError('Refresh token does not exists');
    }

    await this.usersTokensRepository.deleteById(usersToken.id!);

    const refresh_token = sign({ email }, auth.secretRefreshToken, {
      subject: user_id,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dayjsDateProvider.addDays(auth.expiresInRefreshTokenDays),
    });

    const newToken = sign({}, auth.secretToken, {
      subject: user_id,
      expiresIn: auth.expiresInToken,
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
