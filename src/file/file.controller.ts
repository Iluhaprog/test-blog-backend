import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { FileService } from './file.service';
import { FileUploadDto } from './interfaces/FileUploadDto';
import { FileUploadResponseDto } from './interfaces/FileUploadResponseDto';
@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload/:postId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'Authorization',
    description: 'Line of the from Bearer ${jwt}',
  })
  @ApiBody({
    description: 'File to upload.',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    type: FileUploadResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('postId') postId: number,
  ) {
    return this.fileService.uploadFile(file, postId);
  }
}
