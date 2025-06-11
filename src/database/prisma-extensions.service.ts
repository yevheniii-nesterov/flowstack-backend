import { Injectable } from '@nestjs/common';
import { Prisma, Users } from 'generated/client.js';

@Injectable()
export class PrismaExtensionsService {
  getUserExtension = Prisma.defineExtension({
    name: 'get-user-extension',
    client: {
      async getUser(user: { sub: string }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        return (await this.users.findUnique({
          where: { id: user.sub },
        })) as Users;
      },
    },
  });
}
