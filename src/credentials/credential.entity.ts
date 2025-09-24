import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ActorRole } from '../auth/actor-role.enum';

@Entity('credential')
export class Credential {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  token: string;

  @Column({
    type: 'enum',
    enum: ActorRole,
    default: ActorRole.EMP,
  })
  role: ActorRole;

  @Column({ default: true })
  isActive: boolean;
}
