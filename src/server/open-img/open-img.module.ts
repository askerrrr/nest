import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { XlsxService } from '../xlsx/xlsx.service';
import { OpenImgService } from './open-img.service';
import { OpenImgController } from './open-img.controller';

@Module({
  controllers: [OpenImgController],
  imports: [AuthModule],
  providers: [XlsxService, OpenImgService],
})
export class OpenImgModule {}
