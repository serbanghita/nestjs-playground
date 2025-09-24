import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { Location } from './location.entity';
import { CredentialsModule } from '../credentials/credentials.module';
import { LocationsCpoService } from './locations-cpo.service';
import { LocationsEmpService } from './locations-emp.service';
import { LocationsAdminService } from './locations-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), CredentialsModule],
  providers: [
    LocationsCpoService, // Provide the new CPO service
    LocationsEmpService, // Provide the new EMP service,
    LocationsAdminService, // For admin purposes.
  ],
  controllers: [LocationsController],
})
export class LocationsModule {}
