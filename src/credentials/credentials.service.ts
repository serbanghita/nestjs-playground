import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async findOneByToken(token: string): Promise<Credential | null> {
    return this.credentialsRepository.findOneBy({ token, isActive: true });
  }
}
