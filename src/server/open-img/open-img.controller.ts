import { Response } from 'express';
import { Get, Res, Param, UseGuards, Controller } from '@nestjs/common';

import { ParamDto } from './open-img.dto';
import { AuthGuard } from '../auth/auth.guard';
import { OpenImgService } from './open-img.service';

@Controller('image')
export class OpenImgController {
  constructor(private readonly imgService: OpenImgService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId/:orderId')
  async sendImg(@Param() param, @Res() res: Response) {
    var { userId, orderId } = param;

    var filePath = await this.imgService.getFilePath(userId, orderId);

    res.sendFile(filePath);
  }

  @UseGuards(AuthGuard)
  @Get('/check/:userId/:orderId')
  async checkImageExists(@Param() param: ParamDto): Promise<object> {
    var { userId, orderId } = param;

    var fileIsExists: boolean = await this.imgService.checkImageExists(
      userId,
      orderId,
    );

    return { fileIsExists };
  }
}
