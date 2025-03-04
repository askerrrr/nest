import { Response } from 'express';
import { Get, Param, Res, Controller } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @Get(':userId/:orderId')
  async downloadFile(@Param() param, @Res() res: Response) {
    var filePath = await this.downloadFileService.downloadFile(
      param.userId,
      param.orderId,
    );

    res.download(filePath);
  }

  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param) {
    var filePath = await this.downloadFileService.downloadFile(
      param.userId,
      param.orderId,
    );

    var fileIsExists = await this.downloadFileService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
