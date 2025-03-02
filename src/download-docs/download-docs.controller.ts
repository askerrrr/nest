import { Response } from 'express';
import { access, constants } from 'fs/promises';
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

    await access(filePath, constants.F_OK)
      .then(() => res.download(filePath))
      .catch(() => {
        res.status(404).send({ msg: filePath + 'the file does not exist' });
      });
  }
}
