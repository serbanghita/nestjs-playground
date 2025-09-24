import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserSettings } from './user-settings.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;
}
