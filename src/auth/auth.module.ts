import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypedConfigService } from '../config/typed-config.service';
import { AuthConfig } from '../config/auth.config';
//import { AuthGuard } from '../common/guards/auth.guard';
import { PasswordService } from './password.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService) => ({
        secret: config.get<AuthConfig>('auth')?.jwt.secret,
        signOptions: {
          expiresIn: config.get<AuthConfig>('auth')?.jwt.expiresIn,
        },
      }),
    }),
  ],
  providers: [/*AuthGuard, */PasswordService],
  exports: [/*AuthGuard, */JwtModule, PasswordService],
})
export class AuthenticationModule {}
