import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/interfaces/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './guards/BasicAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  async singUp(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}
