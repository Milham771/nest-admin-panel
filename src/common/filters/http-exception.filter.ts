import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const message = typeof exceptionResponse === 'string' 
      ? exceptionResponse 
      : exceptionResponse.message || 'Internal server error';

    // Jika error 401 (Unauthorized) dan berasal dari halaman login
    if (status === 401) {
      return response.redirect('/auth/login?error=true');
    }

    response.status(status).render('error', {
      title: 'Error Occurred',
      statusCode: status,
      message: message,
    });
  }
}
