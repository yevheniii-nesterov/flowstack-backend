import { Injectable } from '@nestjs/common';
import { RegisterRequest } from './dto/register.request';
import { DatabaseRepository } from '../database/database.repository';

type RegisterUserArgs = RegisterRequest;

@Injectable()
export class AuthRepository {
  constructor(private readonly database: DatabaseRepository) {}

  async registerUser(credentials: RegisterUserArgs) {
    return this.database.users.create({
      data: {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      },
      omit: {
        password: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.database.users.findUnique({
      where: {
        email,
      },
    });
  }
}
