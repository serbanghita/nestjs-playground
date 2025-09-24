import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import * as crypto from 'node:crypto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('hello')
  getHello(): Promise<User> {
    const userId = crypto.randomUUID();
    const username = 'test';
    const isActive = true;
    return this.service.insert(userId, username, isActive);
  }
}
