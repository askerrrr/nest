import { Get, Param, Controller } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @Get(':userId/:orderId')
  async downloadFile(@Param() param) {
    return this.downloadFileService.downloadFile(param.userId, param.orderId);
  }
}
