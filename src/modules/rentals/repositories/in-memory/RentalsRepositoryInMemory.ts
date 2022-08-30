import { ICreateRentalInputDto } from '@modules/rentals/dtos/ICreateRental.dto';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({ car_id, user_id, expected_return_date }: ICreateRentalInputDto): Promise<Rental> {
    const rental = new Rental(car_id, user_id, expected_return_date);

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date)!;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date)!;
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id)!;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };
