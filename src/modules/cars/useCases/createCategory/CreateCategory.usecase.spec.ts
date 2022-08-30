import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategory.usecase';

describe('CreateCategory usecase tests', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it('should be able to create a new category', async () => {
    const input = {
      name: 'teste',
      description: 'description test',
    };

    await createCategoryUseCase.execute(input);

    const category = await categoriesRepositoryInMemory.findByName(input.name);

    expect(category.name).toEqual(input.name);
    expect(category.description).toEqual(input.description);
  });

  it('should not be able to create a new category if name already exists', async () => {
    const input = {
      name: 'teste',
      description: 'description test',
    };

    await createCategoryUseCase.execute(input);

    await expect(createCategoryUseCase.execute(input)).rejects.toEqual(new AppError('Category already exists'));
  });
});
