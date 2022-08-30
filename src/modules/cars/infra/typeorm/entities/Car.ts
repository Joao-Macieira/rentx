import {
  Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
    id?: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    daily_rate: number;

  @Column()
    available?: boolean = true;

  @Column()
    license_plate: string;

  @Column()
    fine_amount: number;

  @Column()
    brand: string;

  @Column()
    category_id: string;

  @CreateDateColumn()
    created_at?: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
    category!: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
    specifications?: Specification[];

  constructor(
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string,
    id?: string,
    specifications?: Specification[],
  ) {
    if (!this.id) {
      this.id = id ?? uuidV4();
    }
    this.name = name;
    this.description = description;
    this.daily_rate = daily_rate;
    this.license_plate = license_plate;
    this.fine_amount = fine_amount;
    this.brand = brand;
    this.category_id = category_id;
    this.specifications = specifications;
  }
}

export { Car };
