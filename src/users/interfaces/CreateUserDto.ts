import { MinLength } from 'class-validator';

export class CreateUserDto {
  username: string;

  @MinLength(8, { message: 'Password is short' })
  password: string;
}
