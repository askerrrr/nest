import { Response } from 'express';
import { Get, Res, Param, Controller } from '@nestjs/common';

import { OpenImgService } from './open--img.service';

@Controller('image')
export class OpenImgController {
  constructor(private readonly imgService: OpenImgService) {}

  @Get()
  async sendImg(@Param() param, @Res() res: Response) {
    var { userId, orderId } = param;

    var filePath = await this.imgService.getFilePath(userId, orderId);

    res.sendFile(filePath);
  }

  @Get('/check/:userId/:orderId')
  async checkImageExists(@Param() param): Promise<object> {
    var { userId, orderId } = param;

    var fileIsExists = await this.imgService.checkImageExists(userId, orderId);
    return { fileIsExists };
  }
}
