import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUserCase } from './CreateUser.usercase';

class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, email, password, driver_license,
    } = request.body;

    const createUserUserCase = container.resolve(CreateUserUserCase);
    await createUserUserCase.execute({
      name, email, password, driver_license,
    });

    return response.sendStatus(201);
  }
}

export { CreateUsersController };
