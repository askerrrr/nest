import { Module } from '@nestjs/common';

import { XlsxService } from '../xlsx/xlsx.service';
import { OpenImgService } from './open--img.service';
import { OpenImgController } from './open-img.controller';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [XlsxService, OpenImgService],
  controllers: [OpenImgController],
})
export class OpenImgModule {}
