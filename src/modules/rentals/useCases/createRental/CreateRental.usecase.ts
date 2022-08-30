import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;

  private dateProvider: IDateProvider;

  private carsRepository: ICarsRepository;

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
    @inject('CarsRepository') carsRepository: ICarsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute(input: IRequest): Promise<Rental> {
    const minumumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(input.car_id);

    if (carUnavailable) {
      throw new AppError('Car is not available');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(input.user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      input.expected_return_date,
    );

    if (compare < minumumHour) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      user_id: input.user_id,
      car_id: input.car_id,
      expected_return_date: input.expected_return_date,
    });

    await this.carsRepository.updateAvailable(rental.car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
