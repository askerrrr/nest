import { Response } from 'express';
import { Get, Res, Param, UseGuards, Controller } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { ParamDto } from './download-docs.dto';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @UseGuards(AuthGuard)
  @Get(':userId/:orderId')
  async downloadFile(@Param() param: ParamDto, @Res() res: Response) {
    var { userId, orderId } = param;

    var filePath = await this.downloadFileService.getFilePath(userId, orderId);

    res.download(filePath);
  }

  @UseGuards(AuthGuard)
  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param: ParamDto): Promise<object> {
    var { userId, orderId } = param;

    var filePath: string = await this.downloadFileService.getFilePath(
      userId,
      orderId,
    );

    var fileIsExists: boolean =
      await this.downloadFileService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
