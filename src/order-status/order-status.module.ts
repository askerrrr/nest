import { Module } from '@nestjs/common';
import { Utils } from 'src/services/Utils';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { OrderStatusService } from './order-status.service';
import { DatabaseModule } from 'src/database/database.module';
import { OrderStatusController } from './order-status.controller';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [
    Utils,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderStatusModule {}
