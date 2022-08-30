import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './ListRentalsByUser.usecase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentalsByUser = await listRentalsByUserUseCase.execute(id);

    return response.status(200).json(rentalsByUser);
  }
}

export { ListRentalsByUserController };
