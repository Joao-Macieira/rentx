import { ICreateRentalInputDto } from '../dtos/ICreateRental.dto';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(input: ICreateRentalInputDto): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}
