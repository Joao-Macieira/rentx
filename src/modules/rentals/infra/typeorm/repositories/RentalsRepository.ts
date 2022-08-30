import { getRepository, Repository } from 'typeorm';

import { ICreateRentalInputDto } from '@modules/rentals/dtos/ICreateRental.dto';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental!;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rental!;
  }

  async create(input: ICreateRentalInputDto): Promise<Rental> {
    const rental = this.repository.create({
      id: input.id,
      car_id: input.car_id,
      user_id: input.user_id,
      expected_return_date: input.expected_return_date,
      end_date: input.end_date,
      total: input.total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return openByCar!;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return openByUser!;
  }
}

export { RentalsRepository };
