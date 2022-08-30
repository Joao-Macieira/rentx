import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreateSpecificationInputDto, ISpecificationRepository } from '../ISpecificationsRepository';

class SpecificationInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create(input: ICreateSpecificationInputDto): Promise<Specification> {
    const specification = new Specification(input.name, input.description);

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name)!;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) => ids.includes(specification.id!));
  }
}

export { SpecificationInMemory };
