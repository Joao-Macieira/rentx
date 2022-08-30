import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
    id?: string;

  @Column()
    car_id: string;

  @Column()
    image_name: string;

  @Column()
    created_at?: Date;

  constructor(car_id: string, image_name: string) {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.car_id = car_id;
    this.image_name = image_name;
  }
}

export { CarImage };
