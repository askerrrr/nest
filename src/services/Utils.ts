import { Module } from '@nestjs/common';
import { UtiltForOrder } from './utilsForOrder';
import { UtilsForBotApi } from './utilsForBotApi';
import { UtilsForItemStatus } from './utilsForItemStatus';

@Module({
  providers: [UtiltForOrder, UtilsForBotApi, UtilsForItemStatus],
  exports: [UtiltForOrder, UtilsForBotApi, UtilsForItemStatus],
})
export class Utils {}
