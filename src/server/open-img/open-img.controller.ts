import { Response } from 'express';
import { Get, Res, Param, Controller } from '@nestjs/common';

import { OpenImgService } from './open--img.service';

@Controller('image')
export class OpenImgController {
  constructor(private readonly imgService: OpenImgService) {}

  @Get()
  async sendImg(@Param() param, @Res() res: Response) {
    var { userId, orderId } = param;

    var filePath = await this.imgService.openImg(userId, orderId);

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send('Image not found');
      }
    });
  }
}
