import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';
import { ActorRole } from './actor-role.enum';
import { RequestWithActor } from './actor.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly credentialsService: CredentialsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithActor>();
    const actor = this.getActorFromPath(request.path);

    if (!actor) {
      throw new UnauthorizedException('Invalid actor path');
    }

    // ... (rest of the token logic remains the same)

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }
    const decodedToken = Buffer.from(token, 'base64').toString('ascii');
    const credential =
      await this.credentialsService.findOneByToken(decodedToken);
    if (!credential) {
      throw new UnauthorizedException('Invalid token');
    }

    request['actor'] = actor;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Token' ? token : undefined;
  }

  // Update the return type to use the enum
  private getActorFromPath(path: string): ActorRole | null {
    if (path.includes('/cpo')) {
      return ActorRole.EMP;
    }
    if (path.includes('/emp')) {
      return ActorRole.CPO;
    }
    return null;
  }
}
