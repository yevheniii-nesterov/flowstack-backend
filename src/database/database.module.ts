import { Global, Module } from '@nestjs/common';
import { DatabaseRepository } from './database.repository';
import { DatabaseProvider } from './database.provider';
import { PrismaExtensionsService } from './prisma-extensions.service';

@Global()
@Module({
  providers: [DatabaseRepository, DatabaseProvider, PrismaExtensionsService],
  exports: [DatabaseRepository, DatabaseProvider],
})
export class DatabaseModule {}
