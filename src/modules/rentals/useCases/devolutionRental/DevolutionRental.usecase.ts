import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  private rentalsRepository: IRentalsRepository;

  private carsRepository: ICarsRepository;

  private dateProvider: IDateProvider;

  constructor(
    @inject('RentalsRepository') rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') carsRepository: ICarsRepository,
    @inject('DayjsDateProvider') dateProvider: IDateProvider,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute(input: IRequest): Promise<Rental> {
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(input.id);

    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental does not exist', 404);
    }

    let daily = this.dateProvider.compareInDays(
      rental.start_date!,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      rental.start_date!,
      this.dateProvider.dateNow(),
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id!, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
