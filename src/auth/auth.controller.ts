import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';
import { RegisterRequest } from './dto/register.request';
import { ObjectValidationPipe } from '../pipes/object-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body(new ObjectValidationPipe()) data: LoginRequest) {
    return this.authService.loginUser(data);
  }

  @Post('register')
  async registerUser(@Body(new ObjectValidationPipe()) data: RegisterRequest) {
    return this.authService.registerUser(data);
  }
}
