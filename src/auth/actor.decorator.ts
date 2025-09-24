import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActorRole } from './actor-role.enum';
import { Request } from 'express';

export type RequestWithActor = Request & { actor: ActorRole };

export const Actor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithActor>();
    return request.actor; // Extracts the actor property from the request object
  },
);
