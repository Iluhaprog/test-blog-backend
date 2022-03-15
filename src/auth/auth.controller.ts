import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/interfaces/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './guards/BasicAuthGuard';
import {
  ApiTags,
  ApiHeader,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { SignInResponse } from './interfaces/SignInResponse';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiHeader({
    name: 'Authorization',
    description:
      'Line of the from Bearer base64(username:password). Example: Bearer dXNlcm5hbWU6cGFzc3dvcmQ=',
  })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({
    type: SignInResponse,
  })
  @UseGuards(BasicAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req): Promise<SignInResponse> {
    return this.authService.signIn(req.user);
  }

  @ApiCreatedResponse({
    description: 'User created.',
  })
  @ApiBadRequestResponse({
    description:
      'Password is short/Username should not be empty/password should not be empty',
  })
  @Post('sign-up')
  async singUp(@Body() user: CreateUserDto) {
    await this.usersService.create(user);
  }
}
