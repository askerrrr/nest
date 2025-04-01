import { Response } from 'express';
import { Get, Res, Param, UseGuards, Controller } from '@nestjs/common';

import { ParamDto } from '../dto/app.dtos';
import { AuthGuard } from '../auth/auth.guard';
import { FIleIsExists } from '../xlsx/dto/fileIsExists-dto';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @UseGuards(AuthGuard)
  @Get(':userId/:orderId')
  async downloadFile(
    @Param() param: ParamDto,
    @Res() res: Response,
  ): Promise<void> {
    var { userId, orderId } = param;

    var filePath = await this.downloadFileService.getFilePath(userId, orderId);

    return res.download(filePath);
  }

  @UseGuards(AuthGuard)
  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param: ParamDto): Promise<FIleIsExists> {
    var { userId, orderId } = param;

    var filePath = await this.downloadFileService.getFilePath(userId, orderId);

    var fileIsExists = await this.downloadFileService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
