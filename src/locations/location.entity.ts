import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  longitude: number;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitude: number;

  @Column({ default: true })
  isActive: boolean;
}
