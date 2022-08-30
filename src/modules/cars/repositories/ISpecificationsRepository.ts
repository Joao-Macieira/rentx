import { Specification } from '../infra/typeorm/entities/Specification';

export interface ICreateSpecificationInputDto {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create(input: ICreateSpecificationInputDto): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
