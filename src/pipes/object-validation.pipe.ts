import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

@Injectable()
export class ObjectValidationPipe extends ValidationPipe {
  constructor(options: ValidatorOptions = {}) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        // Extract only the first error message
        console.log('errors:', errors);
        const firstError = errors[0];
        const errorMessage = Object.values(firstError.constraints || {})[0];

        throw new BadRequestException({
          statusCode: 400,
          message: errorMessage,
          error: 'Bad Request',
        });
      },
    });
  }
}
