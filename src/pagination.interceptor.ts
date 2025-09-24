import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/locations/locations-cpo.service';

export interface Response<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    totalNumberOfPages: number;
  };
}

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor<PaginatedResult<T>, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((paginatedResult) => {
        const { data, total, page, limit } = paginatedResult;

        return {
          data,
          pagination: {
            page,
            perPage: limit,
            totalNumberOfPages: Math.ceil(total / limit),
          },
        };
      }),
    );
  }
}
