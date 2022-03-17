import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostDto } from './interfaces/CreatePostDto';
import { UpdatePostDto } from './interfaces/UpdatePostDto';
import { NotOwnerException } from '../exceptions/NotOwnerException';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidPaginationPageException } from 'src/exceptions/InvalidPaginationPageException';
import { GetPostResponse } from './interfaces/GetPostResponse';
import { PaginatedPostsDto } from './interfaces/PaginatedPostsDto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findById(id: number): Promise<GetPostResponse> {
    return await this.postsRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.files', 'file')
      .select([
        'post.id',
        'post.created_at',
        'post.content',
        'user.id',
        'user.username',
        'file.url',
        'file.type',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }

  async findByUser(
    username: string,
    page: number,
    limit: number,
  ): Promise<PaginatedPostsDto> {
    this.pageIsCorrect(page);
    const result = await this.postsRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.files', 'file')
      .select([
        'post.id',
        'post.created_at',
        'post.content',
        'user.username',
        'file.url',
        'file.type',
      ])
      .where('user.username = :username', { username })
      .orderBy('post.created_at', 'DESC')
      .offset(limit * (page - 1))
      .limit(limit)
      .getManyAndCount();
    return {
      posts: result[0],
      count: result[1],
    };
  }

  async create(post: CreatePostDto, userId: number): Promise<Post> {
    return await this.postsRepository.save(
      this.postsRepository.create({
        ...post,
        user: {
          id: userId,
        },
      }),
    );
  }

  async update(post: UpdatePostDto, userId: number) {
    const oldPost = await this.findById(post.id);
    this.isOwner(userId, oldPost);

    return await this.postsRepository.save({
      ...post,
    });
  }

  async delete(id: number, userId: number) {
    this.isOwner(userId, await this.findById(id));

    await this.postsRepository.delete(id);
  }

  private isOwner(userId: number, post: GetPostResponse): void {
    if (userId !== post.user.id) throw new NotOwnerException();
  }

  private pageIsCorrect(page: number): void {
    if (page < 1) throw new InvalidPaginationPageException();
  }
}
