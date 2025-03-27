import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DownloadFileService } from './download-docs.service';
import { DownloadFileController } from './download-docs.controller';

@Module({
  imports: [AuthModule],
  providers: [DownloadFileService],
  controllers: [DownloadFileController],
})
export class DownloadFileModule {}
