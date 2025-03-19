import { Module } from '@nestjs/common';
import { UtilsForOrder } from './utilsForOrder';
import { UtilsForBotApi } from './utilsForBotApi';

@Module({
  providers: [UtilsForOrder, UtilsForBotApi],
  exports: [UtilsForOrder, UtilsForBotApi],
})
export class UtilsModule {}
