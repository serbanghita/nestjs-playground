import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsService } from './credentials.service';
import { Credential } from './credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  providers: [CredentialsService],
  exports: [CredentialsService], // Export the service to be used in other modules
})
export class CredentialsModule {}
