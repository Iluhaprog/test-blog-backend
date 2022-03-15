import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { imageKit } from './imagekit.config';
import { FileController } from './file.controller';

@Module({
  providers: [
    FileService,
    {
      provide: 'ImageKit',
      useValue: imageKit,
    },
  ],
  controllers: [FileController],
})
export class FileModule {}
