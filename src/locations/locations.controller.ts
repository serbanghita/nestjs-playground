import { Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Location } from './location.entity';
import { randomInt } from '../utils';
import { AuthGuard } from '../auth/auth.guard';
import { LocationsCpoService } from './locations-cpo.service';
import { LocationsEmpService } from './locations-emp.service';
import { LocationsAdminService } from './locations-admin.service';
import { PaginationInterceptor } from '../pagination.interceptor';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly cpoService: LocationsCpoService,
    private readonly empService: LocationsEmpService,
    private readonly adminService: LocationsAdminService,
  ) {}

  @Get('/cpo')
  @UseInterceptors(PaginationInterceptor)
  getAllCpoLocations(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number) {
    return this.cpoService.findAll(page, limit);
  }

  @Get('/emp')
  @UseGuards(AuthGuard)
  getAllEmpLocations(): Promise<Location[]> {
    return this.empService.findAll();
  }

  // This route is unprotected as it doesn't have the @UseGuards decorator
  @Post('add')
  addLocation(): Promise<Location> {
    return this.adminService.insert(crypto.randomUUID(), randomInt(1, 10), randomInt(1, 20), true);
  }
}
