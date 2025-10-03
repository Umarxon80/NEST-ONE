import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { signinUserDto } from '../users/dto/signin-user.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinUserDto: signinUserDto) {
    return this.authService.signin(signinUserDto);
  }
}
