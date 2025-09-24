import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { UserSettings } from '../users/user-settings.entity';
import { LocationsModule } from '../locations/locations.module';
import { Location } from '../locations/location.entity';
import { Credential } from '../credentials/credential.entity';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost', // Use environment variable
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432, // Use environment variable
      username: process.env.DATABASE_USER || 'dbuser', // Use environment variable
      password: process.env.DATABASE_PASSWORD || 'dbpass', // Use environment variable
      database: process.env.DATABASE_NAME || 'nestappdb', // Use environment variable
      entities: [User, UserSettings, Location, Credential],
      //entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    LocationsModule,
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
