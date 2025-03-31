import { Module } from '@nestjs/common';

import { XlsxModule } from '../xlsx/xlsx.module';
import { AuthModule } from '../auth/auth.module';

import { OpenImgService } from './open-img.service';

import { OpenImgController } from './open-img.controller';

@Module({
  controllers: [OpenImgController],
  imports: [AuthModule, XlsxModule],
  providers: [OpenImgService],
})
export class OpenImgModule {}
