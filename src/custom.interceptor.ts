import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseReportDTO } from './report/report.dto';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('this will run in request');

    return next.handle().pipe(
      map((data: any) => {
       return data
        
      }),
    );
  }
}
