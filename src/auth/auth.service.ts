import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { Prisma } from 'generated/client.js';
import { JwtResponse } from './dto/jwt.response';
import { LoginRequest } from './dto/login.request';
import { RegisterRequest } from './dto/register.request';

type LoginUserArgs = LoginRequest;

type RegisterUserArgs = RegisterRequest;

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async loginUser(credentials: LoginUserArgs): Promise<JwtResponse> {
    const user = await this.authRepository.getUserByEmail(credentials.email);

    if (!user) throw new UnauthorizedException('Невірний логін або пароль');
    if (
      !(await this.passwordService.verify(credentials.password, user.password))
    ) {
      throw new UnauthorizedException('Невірний логін або пароль');
    }

    return this.generateToken(user);
  }

  async registerUser(credentials: RegisterUserArgs) {
    const hashedPassword = await this.passwordService.hash(
      credentials.password,
    );

    await this.authRepository
      .registerUser({
        ...credentials,
        password: hashedPassword,
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        if (e.code === 'P2002') {
          throw new BadRequestException('Користувач з цією поштою вже існує');
        }
      });
  }

  private generateToken(user: Prisma.UsersWhereInput): JwtResponse {
    const payload = {
      sub: user.id,
      name: user.name,
    };
    const token = this.jwtService.sign(payload);
    return {
      tokenType: 'Bearer',
      token: token,
    };
  }
}
