import { Module } from '@nestjs/common';
import { DownloadImgService } from './download-img.service';
import { DownloadImgController } from './download-img.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DownloadImgService],
  controllers: [DownloadImgController],
})
export class DownloadImgModule {}
