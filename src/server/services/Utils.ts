import { Module } from '@nestjs/common';
import { UtilsForOrder } from './utilsForOrder';
import { UtilsForBotApi } from './utilsForBotApi';
import { UtilsForItemStatus } from './utilsForItemStatus';

@Module({
  providers: [UtilsForOrder, UtilsForBotApi, UtilsForItemStatus],
  exports: [UtilsForOrder, UtilsForBotApi, UtilsForItemStatus],
})
export class UtilsModule {}
