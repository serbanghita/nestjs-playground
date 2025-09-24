import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { randomInt } from '../utils';
import { AuthGuard } from '../auth/auth.guard';
import { Actor } from '../auth/actor.decorator';
import { ActorRole } from '../auth/actor-role.enum';

@Controller('locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  // This single method now handles both /cpo and /emp routes.
  // The guard ensures it's only accessible via those paths with a valid token.
  @Get(['/cpo', '/emp'])
  @UseGuards(AuthGuard)
  getLocationsForActor(@Actor() actor: ActorRole): Promise<Location[]> {
    console.log(`Request received from actor: ${actor}`);
    // You can now use the 'actor' variable to implement specific business logic
    // For example: return this.service.findAllForActor(actor);
    return this.service.findAll();
  }

  // A generic route without the guard
  @Get('/')
  getAllLocations(): Promise<Location[]> {
    return this.service.findAll();
  }

  // This route is unprotected as it doesn't have the @UseGuards decorator
  @Post('add')
  addLocation(): Promise<Location> {
    return this.service.insert(
      crypto.randomUUID(),
      randomInt(1, 10),
      randomInt(1, 20),
      true,
    );
  }
}
