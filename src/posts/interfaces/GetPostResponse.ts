import { ApiProperty } from '@nestjs/swagger';

export class GetPostResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  content: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      username: {
        type: 'string',
      },
    },
  })
  user: {
    id: number;
    username: string;
  };
}
