import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategories.usecase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
    const categories = await listCategoryUseCase.execute();
    return response.status(200).json({ categories });
  }
}

export { ListCategoriesController };
