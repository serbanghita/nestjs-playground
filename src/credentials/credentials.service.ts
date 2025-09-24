import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './credential.entity';
import { ActorRole } from '../auth/actor-role.enum';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  /**
   * Finds a credential by token and role.
   * A token can exist for multiple roles, so the role is essential for lookup.
   */
  async findOneByTokenAndRole(token: string, role: ActorRole): Promise<Credential | null> {
    return this.credentialsRepository.findOneBy({
      token,
      role,
      isActive: true,
    });
  }
}
