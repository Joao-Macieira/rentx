import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCar.usecase';

describe('create car usecase tests', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    });

    expect(car.id).toBeDefined();
  });

  it('should not be able to create a car with license plate already exists', async () => {
    await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    });

    await expect(createCarUseCase.execute({
      name: 'name car 2',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    })).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a with with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
