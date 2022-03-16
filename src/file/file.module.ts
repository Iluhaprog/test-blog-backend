import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ImageKitProvider } from './imagekit.provider';
import { FileController } from './file.controller';

@Module({
  providers: [FileService, ImageKitProvider],
  controllers: [FileController],
})
export class FileModule {}
