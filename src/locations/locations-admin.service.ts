import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsAdminService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  insert(id: string, longitude: number, latitude: number, isActive: boolean): Promise<Location> {
    const user = this.locationsRepository.create({
      id,
      longitude,
      latitude,
      isActive,
    });
    return this.locationsRepository.save(user);
  }

  findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  findOne(id: string): Promise<Location | null> {
    return this.locationsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.locationsRepository.delete(id);
  }
}
