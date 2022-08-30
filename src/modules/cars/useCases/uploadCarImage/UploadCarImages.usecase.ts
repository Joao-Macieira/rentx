import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  private carsImagesRepository: ICarsImagesRepository;

  constructor(@inject('CarsImagesRepository') carsImagesRepository: ICarsImagesRepository) {
    this.carsImagesRepository = carsImagesRepository;
  }

  async execute(input: IRequest): Promise<void> {
    input.images_name.map(async (image) => {
      await this.carsImagesRepository.create(input.car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
