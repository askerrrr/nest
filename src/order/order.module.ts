import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost/database'),
  ],
})
export class OrderModule {}
