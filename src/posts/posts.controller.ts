import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { CreatePostDto } from './interfaces/CreatePostDto';
import { UpdatePostDto } from './interfaces/UpdatePostDto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import {
  ApiTags,
  ApiHeader,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetPostResponse } from './interfaces/GetPostResponse';
import { PaginatedPostsDto } from './interfaces/PaginatedPostsDto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    type: GetPostResponse,
  })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<GetPostResponse> {
    return await this.postsService.findById(+id);
  }

  @ApiOkResponse({
    type: PaginatedPostsDto,
  })
  @Get(':username/:page/:limit')
  async findByUser(
    @Param('username') username: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<PaginatedPostsDto> {
    return await this.postsService.findByUser(username, +page, +limit);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Line of the from Bearer ${jwt}',
  })
  @ApiOkResponse({
    type: PostEntity,
  })
  @ApiBadRequestResponse({
    description: 'Content should not be empty.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto, @Request() req) {
    return await this.postsService.create(post, req.user.id);
  }

  @ApiOkResponse({
    description: 'Return updated post',
    type: PostEntity,
  })
  @ApiForbiddenResponse({
    description: 'You is not owner for this post.',
  })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() post: UpdatePostDto, @Request() req) {
    return await this.postsService.update(post, req.user.id);
  }

  @ApiOkResponse({
    description: 'Post deleted.',
  })
  @ApiForbiddenResponse({
    description: 'You is not owner for this post.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req) {
    return await this.postsService.delete(+id, req.user.id);
  }
}
