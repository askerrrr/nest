import { Response } from 'express';
import { Get, Param, Res, Controller } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @Get(':userId/:orderId')
  async downloadFile(@Param() param, @Res() res: Response) {
    var { userId, orderId } = param;

    var filePath = await this.downloadFileService.downloadFile(userId, orderId);

    res.download(filePath);
  }

  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param) {
    var { userId, orderId } = param;

    var filePath = await this.downloadFileService.downloadFile(userId, orderId);

    var fileIsExists = await this.downloadFileService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
