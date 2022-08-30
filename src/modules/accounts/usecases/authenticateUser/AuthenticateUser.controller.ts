import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUserCase } from './AuthenticateUser.usecase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheUseCase = container.resolve(AuthenticateUserUserCase);

    const authInfo = await autheUseCase.execute({ email, password });

    return response.json({ authInfo });
  }
}

export { AuthenticateUserController };
