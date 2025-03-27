import { Module } from '@nestjs/common';

import { OrderService } from './order.service';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './order.controller';
import { UtilsModule } from 'src/server/services/Utils';
@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [AuthModule, UtilsModule],
})
export class OrderModule {}
