import { Module } from '@nestjs/common';
import { ItemStatusService } from './item-status.service';
import { ItemStatusController } from './item-status.controller';

@Module({
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
})
export class ItemStatusModule {}
