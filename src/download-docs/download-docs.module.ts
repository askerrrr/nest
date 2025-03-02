import { Module } from '@nestjs/common';
import { DownloadFileService } from './download-docs.service';
import { DownloadFileController } from './download-docs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DownloadFileService],
  controllers: [DownloadFileController],
})
export class DownloadFileModule {}
