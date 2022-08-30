import { Category } from '../infra/typeorm/entities/Category';

export interface ICreateCategoryInputDto {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(input: ICreateCategoryInputDto): Promise<void>;
}
