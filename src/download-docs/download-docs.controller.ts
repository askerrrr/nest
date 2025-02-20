import { Get, Bind, Param, Controller } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';

@Controller('download')
export class DownloadFileController {
  constructor(private readonly downloadFileService: DownloadFileService) {}

  @Get(':userId/:orderId')
  @Bind(Param())
  async downloadFile(param) {
    return this.downloadFileService.downloadFile(param.userId, param.orderId);
  }
}
