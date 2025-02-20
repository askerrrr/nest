import { Module } from '@nestjs/common';
import { BotApiService } from './bot-api.service';
import { BotApiController } from './bot-api.controller';

@Module({
  controllers: [BotApiController],
  providers: [BotApiService],
})
export class BotApiModule {}
