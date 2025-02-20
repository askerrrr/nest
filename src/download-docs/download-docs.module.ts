import { Module } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';
import { DownloadFileController } from './download-docs.controller';

@Module({
  controllers: [DownloadFileController],
  providers: [DownloadFileService],
})
export class DownloadFileModule {}
