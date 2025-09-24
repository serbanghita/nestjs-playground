// src/locations/locations-cpo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

// Define a reusable type for paginated results
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class LocationsCpoService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  /**
   * Finds all locations with pagination.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @returns A promise of a paginated result.
   */
  async findAll(page: number, limit: number): Promise<PaginatedResult<Location>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.locationsRepository.findAndCount({
      skip: skip,
      take: limit,
      // You can add order, where clauses, etc. here
      order: {
        id: 'ASC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
