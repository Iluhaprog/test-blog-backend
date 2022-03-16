import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ImageKitProvider } from './imagekit.provider';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService, ImageKitProvider],
  controllers: [FileController],
})
export class FileModule {}
