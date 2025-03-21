import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DownloadFileService } from './download-docs.service';
import { DownloadFileController } from './download-docs.controller';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [DownloadFileService],
  controllers: [DownloadFileController],
})
export class DownloadFileModule {}
