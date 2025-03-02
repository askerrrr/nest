import { Response } from 'express';
import { access, constants } from 'fs/promises';
import { Get, Res, Param, Controller } from '@nestjs/common';
import { DownloadImgService } from './download-img.service';

@Controller('image')
export class DownloadImgController {
  constructor(private readonly downloadImgService: DownloadImgService) {}

  @Get()
  async downloadImg(@Param() param, @Res() res: Response) {
    var filePath = await this.downloadImgService.downloadImg(
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
