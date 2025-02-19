import { Module } from '@nestjs/common';
import { ItemIdService } from './item-id.service';
import { ItemIdController } from './item-id.controller';

@Module({
  controllers: [ItemIdController],
  providers: [ItemIdService],
})
export class ItemIdModule {}
