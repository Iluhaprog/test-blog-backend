import { MinLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Minimum number of characters is 8',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is short' })
  password: string;
}
