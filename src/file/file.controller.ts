import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable, Stream } from 'stream';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('profile-image/:userId')
  @Header('Content-Type', 'application/octet-stream')
  downloadProfile(
    @Param('userId') userId: string,
    @Res() res,
  ): Promise<Stream> {
    return this.fileService.downloadProfile(userId).then((contact) => {
      const readableStream = new Readable();
      readableStream._read = function noop() {};
      readableStream.push(contact.file);
      readableStream.push(null);
      res.set('Content-Disposition', `inline; filename=${contact.filename}`);
      return readableStream.pipe(res);
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() { userId }) {
    return this.fileService.uploadFile(file, userId);
  }
}
