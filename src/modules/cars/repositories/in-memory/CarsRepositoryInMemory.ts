import { ICreateCarInputDto } from '@modules/cars/dtos/ICreateCars.dto';
import { IListCarsInputDto } from '@modules/cars/dtos/IListCars.dto';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)!;
  }

  async findAvailable({ name, brand, category_id }: IListCarsInputDto): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => car.available === true);

    if (name || brand || category_id) {
      const cars = availableCars.filter(
        (car) => (brand && car.brand === brand)
          || (category_id && car.category_id === category_id)
          || (name && car.name === name),
      );

      return cars;
    }

    return availableCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)!;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarInputDto): Promise<Car> {
    const car = new Car(
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
      specifications,
    );

    this.cars.push(car);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
