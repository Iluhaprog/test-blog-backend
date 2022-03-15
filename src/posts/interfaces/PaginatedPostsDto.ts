import { GetPostResponse } from './GetPostResponse';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post.entity';
export class PaginatedPostsDto {
  @ApiProperty({
    type: [GetPostResponse],
  })
  posts: Post[];

  @ApiProperty()
  count: number;
}
