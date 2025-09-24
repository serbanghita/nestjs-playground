import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './location.entity';
import { CredentialsModule } from '../credentials/credentials.module'; // Import CredentialsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    CredentialsModule, // Add it here
  ],
  providers: [LocationsService],
  controllers: [LocationsController],
  // The 'exports' property is generally not needed here unless another module needs to import TypeOrm entities from this one.
  // exports: [TypeOrmModule],
})
export class LocationsModule {}
