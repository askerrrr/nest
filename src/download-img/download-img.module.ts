import { Module } from '@nestjs/common';
import { DownloadImgService } from './download-img.service';
import { DownloadImgController } from './download-img.controller';

@Module({
  controllers: [DownloadImgController],
  providers: [DownloadImgService],
})
export class DownloadImgModule {}
