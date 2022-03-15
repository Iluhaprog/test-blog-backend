import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './interfaces/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  async create(user: CreateUserDto) {
    return await this.usersRepository.save(this.usersRepository.create(user));
  }
}
