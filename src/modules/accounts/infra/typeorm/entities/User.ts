/* eslint-disable indent */
import {
 Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin?: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at?: string;

  constructor(
    name: string,
    email: string,
    password: string,
    driver_license: string,
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.name = name;
    this.email = email;
    this.password = password;
    this.driver_license = driver_license;
  }
}

export { User };
