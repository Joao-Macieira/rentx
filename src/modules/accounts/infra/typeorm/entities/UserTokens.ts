import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
    id?: string;

  @Column()
    refresh_token: string;

  @Column()
    user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user!: User;

  @Column()
    expires_date: Date;

  @CreateDateColumn()
    created_at?: Date;

  constructor(refresh_token: string, user_id: string, expires_date: Date) {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.refresh_token = refresh_token;
    this.user_id = user_id;
    this.expires_date = expires_date;
  }
}

export { UserTokens };
