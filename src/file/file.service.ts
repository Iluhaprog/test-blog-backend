import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @Inject('ImageKit')
    private imageKit: any,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(file: Express.Multer.File, postId: number) {
    return new Promise((resolve, reject) => {
      this.imageKit.upload(
        {
          file: file.buffer,
          fileName: file.originalname,
        },
        (error, result) => {
          if (error) reject(error);
          this.fileRepository.save(
            this.fileRepository.create({
              url: result.url,
              type: file.mimetype,
              post: {
                id: postId,
              },
            }),
          );
          resolve({ url: result.url, type: file.mimetype });
        },
      );
    });
  }
}
