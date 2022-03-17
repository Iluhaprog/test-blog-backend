import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiQuery,
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
    description:
      'File to upload. Supported file types: mp4, jpg, jpeg, png, gif, txt, svg, webp, js, css, pdf.',
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

  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  @ApiQuery({
    name: 'url',
    description: 'Url of file that need delete',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Line of the from Bearer ${jwt}',
  })
  @ApiOkResponse({
    description: 'File deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  removeImage(@Query('url') url: string) {
    return this.fileService.removeFile(url);
  }
}
