import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UtilsModule } from 'src/server/services/Utils';
import { OrderStatusService } from './order-status.service';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { OrderStatusController } from './order-status.controller';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderStatusModule {}
