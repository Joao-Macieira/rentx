import { ICreateCarInputDto } from '../dtos/ICreateCars.dto';
import { IListCarsInputDto } from '../dtos/IListCars.dto';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(input: ICreateCarInputDto): Promise<Car>;
  findAvailable({ name, brand, category_id }: IListCarsInputDto): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
