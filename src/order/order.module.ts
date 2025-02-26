import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderModule {}
