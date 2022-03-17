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
        async (error, result) => {
          if (error) reject(error);
          await this.fileRepository.save(
            this.fileRepository.create({
              url: result.url,
              type: file.mimetype,
              ikId: result.fileId,
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

  async removeFile(fileUrl: string) {
    const file = await this.fileRepository.findOne({ where: { url: fileUrl } });
    await new Promise((resolve, reject) => {
      this.imageKit.deleteFile(file.ikId, (err) => {
        if (err) return reject(err);
        resolve(fileUrl);
      });
    });
    await this.fileRepository.delete(file.id);
  }
}
