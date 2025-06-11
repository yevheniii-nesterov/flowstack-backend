import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/client.js';
import { PrismaExtensionsService } from './prisma-extensions.service';

@Injectable()
export class DatabaseProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly prismaExtensionsService: PrismaExtensionsService,
  ) {
    super({
      log: ['query', 'error'],
    });
  }

  private static initialized = false;

  async onModuleInit() {
    if (!DatabaseProvider.initialized) {
      DatabaseProvider.initialized = true;
      await this.$connect();
    }
  }

  async onModuleDestroy() {
    if (DatabaseProvider.initialized) {
      DatabaseProvider.initialized = false;
      await this.$disconnect();
    }
  }

  withExtensions() {
    return this.$extends(this.prismaExtensionsService.getUserExtension);
  }

  /*async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }*/
}
