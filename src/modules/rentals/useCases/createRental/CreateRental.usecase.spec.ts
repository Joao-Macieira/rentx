import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRental.usecase';

describe('rental tests', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let dayjsDateProvider: DayjsDateProvider;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id!,
      expected_return_date: dayjs().add(1, 'day').toDate(),
    });

    expect(rental.id).toBeDefined();
    expect(rental.start_date).toBeDefined();
  });

  it('should not be able to create a rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    });

    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    })).rejects.toEqual(new AppError('There is a rental in progress for user'));
  });

  it('should not be able to create a rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    });

    await expect(createRentalUseCase.execute({
      user_id: '54321',
      car_id: '121212',
      expected_return_date: new Date(),
    })).rejects.toEqual(new AppError('Car is not available'));
  });

  it('should not be able to create a rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    })).rejects.toEqual(new AppError('Invalid return time'));
  });
});
