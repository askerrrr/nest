import { Module } from '@nestjs/common';

import { OpenImgService } from './open--img.service';
import { OpenImgController } from './open-img.controller';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OpenImgService],
  controllers: [OpenImgController],
})
export class OpenImgModule {}
