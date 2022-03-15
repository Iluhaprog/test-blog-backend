import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(
    @Inject('ImageKit')
    private imageKit: any,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      this.imageKit.upload(
        {
          file: file.buffer,
          fileName: file.originalname,
        },
        (error, result) => {
          if (error) reject(error);
          resolve({ url: result.url });
        },
      );
    });
  }
}
