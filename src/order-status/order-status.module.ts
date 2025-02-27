import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { DatabaseModule } from 'src/database/database.module';
import { OrderStatusController } from './order-status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderStatusModule {}
