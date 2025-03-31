import { Module } from '@nestjs/common';

import { XlsxModule } from '../xlsx/xlsx.module';
import { BotApiService } from './bot-api.service';
import { BotApiController } from './bot-api.controller';
import { UtilsModule } from 'src/server/services/Utils';

@Module({
  controllers: [BotApiController],
  providers: [BotApiService],
  imports: [XlsxModule, UtilsModule],
})
export class BotApiModule {}
