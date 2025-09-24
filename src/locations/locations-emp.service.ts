import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsEmpService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    // Add EMP-specific logic here in the future
    console.log('Fetching all locations via LocationsEmpService');
    return this.locationsRepository.find();
  }
}
