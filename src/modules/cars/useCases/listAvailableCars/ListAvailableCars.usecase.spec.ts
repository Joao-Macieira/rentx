import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCars.usecase';

describe('List cars usecase tests', () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all availables cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110,
      license_plate: 'ABC-2143',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all availables cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110,
      license_plate: 'ABC-2143',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const emptyCar = await listAvailableCarsUseCase.execute({ name: 'teste' });

    expect(emptyCar.length).toBe(0);

    const returnedCar = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(returnedCar).toEqual([car]);
  });

  it('should be able to list all availables cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110,
      license_plate: 'ABC-2143',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const emptyCar = await listAvailableCarsUseCase.execute({ brand: 'teste' });

    expect(emptyCar.length).toBe(0);

    const returnedCar = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(returnedCar).toEqual([car]);
  });

  it('should be able to list all availables cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço',
      daily_rate: 110,
      license_plate: 'ABC-2143',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const emptyCar = await listAvailableCarsUseCase.execute({ category_id: 'teste' });

    expect(emptyCar.length).toBe(0);

    const returnedCar = await listAvailableCarsUseCase.execute({ category_id: car.category_id });

    expect(returnedCar).toEqual([car]);
  });
});
