import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credential')
export class Credential {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;
}
