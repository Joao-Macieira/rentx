import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshToken.usecase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers['x-access-token'] || request.query.token;

    const refreshTokensUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokensUseCase.execute(token);

    return response.json(refreshToken);
  }
}

export { RefreshTokenController };
