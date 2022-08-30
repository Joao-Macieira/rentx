import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
    id?: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
    car!: Car;

  @Column()
    car_id: string;

  @Column()
    user_id: string;

  @Column()
    start_date?: Date;

  @Column()
    end_date?: Date;

  @Column()
    expected_return_date: Date;

  @Column()
    total?: number;

  @CreateDateColumn()
    created_at?: Date;

  @UpdateDateColumn()
    updated_at?: Date;

  constructor(car_id: string, user_id: string, expected_return_date: Date) {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.car_id = car_id;
    this.user_id = user_id;
    this.expected_return_date = expected_return_date;
    this.start_date = new Date();
  }
}

export { Rental };
