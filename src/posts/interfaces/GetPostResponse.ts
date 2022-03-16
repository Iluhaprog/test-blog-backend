import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/file/file.entity';

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

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: {
          type: 'number',
        },
        type: {
          type: 'string',
        },
      },
    },
  })
  files: File[];
}
