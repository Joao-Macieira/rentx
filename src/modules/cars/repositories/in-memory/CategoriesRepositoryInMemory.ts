import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryInputDto } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)!;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(input: ICreateCategoryInputDto): Promise<void> {
    const category = new Category(input.name, input.description);

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
