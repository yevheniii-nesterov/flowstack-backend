import { Injectable, Type } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

const ExtendedPrismaClient = class {
  constructor(provider: DatabaseProvider) {
    return provider.withExtensions();
  }
} as Type<ReturnType<DatabaseProvider['withExtensions']>>;

@Injectable()
export class DatabaseRepository extends ExtendedPrismaClient {
  constructor(provider: DatabaseProvider) {
    super(provider);
  }
}
